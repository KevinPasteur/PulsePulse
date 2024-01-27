import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter, IonModal } from '@ionic/angular';
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

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class WorkoutDetailPage implements ViewWillEnter {
  exercisesFromAWorkout: any[] = [];
  totalExercises: any[] = [];
  workout: any;
  averageLevel: string = '';
  averageDuration: string = '';

  @ViewChild('exerciseModal') exerciseModal: IonModal;

  selectedExercise: any;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
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
          const id = params.get('id');

          return forkJoin({
            workout: this.workoutService.getWorkoutFromId$(id),
            exercises: this.workoutService.getExercisesFromAWorkout$(id),
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
}
