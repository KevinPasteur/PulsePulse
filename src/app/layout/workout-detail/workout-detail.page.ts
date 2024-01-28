import { Component, ViewChild } from '@angular/core';
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
  flameOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Exercise } from 'src/app/exercises/create-exercise/exercise.model';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
import { AddExerciceComponent } from 'src/app/components/add-exercice/add-exercice.component';
import { ModalController } from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';

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
  workoutId: any;

  @ViewChild('exerciseModal') exerciseModal: IonModal;

  selectedExercise: any;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private utilsService: UtilsService
  ) {
    addIcons({
      heart,
      add,
      playCircleOutline,
      ellipsisHorizontal,
      chevronForwardOutline,
      flameOutline,
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
      });
  }

  calculateAverageLevel(exercises: any) {
    type ExerciseLevel = 'Facile' | 'Moyen' | 'Difficile';

    if (exercises.length === 0) return 'n/a';

    const levelMapping: { [key in ExerciseLevel]: number } = {
      Facile: 1,
      Moyen: 2,
      Difficile: 3,
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
        this.averageLevel = this.calculateAverageLevel(exercises);
      });
  }

  async presentConfirmationToast(exerciseName: any) {
    const toast = await this.toastController.create({
      message: `${exerciseName} a bien été ajouté à votre workout`,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  getThumbnail(bodyParts: string | string[]): string {
    return this.utilsService.getThumbnailUrl(bodyParts);
  }

  getFlameCount(level: string): number {
    switch (level) {
      case 'Facile':
        return 1;
      case 'Moyen':
        return 2;
      case 'Difficile':
        return 3;
      default:
        return 0;
    }
  }

  translateBodyPart(part: string): string {
    return this.utilsService.translateBodyPart(part);
  }
}
