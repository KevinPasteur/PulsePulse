import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  ViewWillEnter,
  IonModal,
  ToastController,
} from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {
  heart,
  add,
  playCircleOutline,
  ellipsisHorizontal,
  chevronForwardOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Exercise } from 'src/app/exercises/create-exercise/exercise.model';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { AddExerciceComponent } from 'src/app/components/add-exercice/add-exercice.component';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    AudioPlayerComponent,
  ],
})
export class WorkoutDetailPage implements ViewWillEnter {
  exercisesFromAWorkout: any[] = [];
  totalExercises: any[] = [];
  workout: any;
  averageLevel: string = '';
  averageDuration: string = '';
  workoutId: any;

  @ViewChild('exerciseModal') exerciseModal: IonModal;

  selectedExercise: any;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    addIcons({
      heart,
      add,
      playCircleOutline,
      ellipsisHorizontal,
      chevronForwardOutline,
    });
  }

  ionViewWillEnter(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.workoutId = params.get('id');

          return forkJoin({
            workout: this.workoutService.getWorkoutFromId$(this.workoutId),
            exercises: this.workoutService.getExercisesFromAWorkout$(
              this.workoutId
            ),
          });
        })
      )
      .subscribe(({ workout, exercises }) => {
        this.workout = workout;
        this.exercisesFromAWorkout = exercises;
        this.averageLevel = this.calculateAverageLevel(exercises);
        this.averageDuration = this.calculateTotalDuration(exercises);
        console.log(workout, exercises);
      });
  }

  calculateTotalDuration(exercises: any) {
    const totalSeconds = exercises.reduce(
      (sum: number, exercise: Exercise) => sum + exercise.duration,
      0
    );

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    console.log(
      minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`
    );
    return minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  }

  calculateAverageLevel(exercises: any) {
    type ExerciseLevel = 'Easy' | 'Medium' | 'Hard';

    const levelMapping: { [key in ExerciseLevel]: number } = {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    };

    let totalLevel = 0;

    exercises.forEach((exercise: Exercise) => {
      const level: ExerciseLevel = exercise.level as ExerciseLevel;

      totalLevel += levelMapping[level];
    });

    const averageLevel = totalLevel / exercises.length;

    if (averageLevel <= 1.5) return 'Facile';
    else if (averageLevel <= 2.5) return 'Moyen';
    else return 'Difficile';
  }

  openModal(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.exerciseModal.present();
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  translateBodyPart(part: string): any {
    const translations: { [key: string]: string } = {
      pecs: 'Pectoraux',
      shoulders: 'Épaules',
      biceps: 'Biceps',
      triceps: 'Triceps',
      forearms: 'Avant-bras',
      traps: 'Trapèzes',
      back: 'Dos',
      lowerback: 'Bas du dos',
      glutes: 'Fessiers',
      quadriceps: 'Quadriceps',
      hamstrings: 'Ischio-jambiers',
      calves: 'Mollets',
    };
    return translations[part] || part;
  }

  async openExerciseModal() {
    this.workoutId;
    const modal = await this.modalCtrl.create({
      component: AddExerciceComponent,
      componentProps: {
        workoutId: this.workoutId,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        const exercise = data.data;

        this.refreshExercisesFromWorkout();

        this.presentConfirmationToast(exercise.name);

        const toast = await this.toastController.create({
          message: `${exercise.name} a bien été ajouté à votre workout`,
          duration: 2000,
          color: 'success',
        });
        toast.present();
      }
    });

    await modal.present();
  }

  refreshExercisesFromWorkout() {
    this.workoutService
      .getExercisesFromAWorkout$(this.workoutId)
      .subscribe((exercises) => {
        this.exercisesFromAWorkout = exercises;
        // Calculez à nouveau les statistiques moyennes si nécessaire
        this.averageLevel = this.calculateAverageLevel(exercises);
      });
  }

  // Méthode pour afficher le toast de confirmation
  async presentConfirmationToast(exerciseName: any) {
    const toast = await this.toastController.create({
      message: `${exerciseName} a bien été ajouté à votre workout`,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
