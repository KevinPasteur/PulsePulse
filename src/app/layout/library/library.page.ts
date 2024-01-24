import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  heart,
  add,
  playCircleOutline,
  ellipsisHorizontal,
  chevronForwardOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../security/auth.service';
import { User } from 'src/app/security/user.model';
import { RouterLink } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LibraryPage implements ViewWillEnter {
  exercises: any[] = [];
  workouts: any[] = [];
  currentUser: any;
  selectedSegment: string = 'workouts';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService
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
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
    });

    this.workoutService.workouts$.subscribe((workouts) => {
      this.workouts = workouts;
    });

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.loadExercises();
        this.loadWorkouts();
      }
    });
  }

  loadExercises() {
    this.exerciseService.loadExercises(this.currentUser.id);
  }

  loadWorkouts() {
    this.workoutService.loadWorkouts(this.currentUser.id);
  }
}
