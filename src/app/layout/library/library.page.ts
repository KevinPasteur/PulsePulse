import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import {
  heart,
  add,
  playCircleOutline,
  ellipsisHorizontal,
  chevronForwardOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../../security/auth.service';
import { RouterLink } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { AudioService } from 'src/app/services/audio.service';
import { AudioPlayerComponent } from 'src/app/components/audio-player/audio-player.component';
@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    AudioPlayerComponent,
  ],
})
export class LibraryPage implements ViewWillEnter {
  selectedSegment: string = 'workouts';
  exercises: any[] = [];
  workouts: any[] = [];
  currentUser: any;

  filteredExercises: any[] = [];
  filteredWorkouts: any[] = [];
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private audioService: AudioService
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
    this.selectedSegment = 'workouts';
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
      this.filteredExercises = [...this.exercises];
    });

    this.workoutService.workouts$.subscribe((workouts) => {
      this.workouts = workouts;
      this.filteredWorkouts = [...this.workouts];
    });

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.loadExercises();
        this.loadWorkouts();
      }
    });
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  loadExercises() {
    this.exerciseService.loadExercises(this.currentUser.id);
  }

  loadWorkouts() {
    this.workoutService.loadWorkouts(this.currentUser.id);
  }

  playAudio() {
    this.audioService.play();
  }

  search(event: any) {
    const searchTerm = event.detail.value.toLowerCase();

    if (this.selectedSegment === 'workouts') {
      this.filteredWorkouts = this.workouts.filter((workout) =>
        workout.name.toLowerCase().includes(searchTerm)
      );
    } else if (this.selectedSegment === 'exercises') {
      this.filteredExercises = this.exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
}
