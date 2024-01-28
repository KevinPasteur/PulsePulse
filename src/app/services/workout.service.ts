import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';

import { Workout } from '../workouts/workout.model';
import { WorkoutRequest } from '../workouts/workoutRequest.model';
import { WorkoutResponse } from '../workouts/workoutResponse.model';

import { UserService } from './user.service';
import { Exercise } from '../exercises/create-exercise/exercise.model';
import { WorkoutExercisesResponse } from '../workouts/workoutExercisesResponse.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  workouts$ = this.workoutsSubject.asObservable();

  private exercisesFromAWorkoutSubject = new BehaviorSubject<Exercise[]>([]);
  exercisesFromAWorkout$ = this.exercisesFromAWorkoutSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private userService: UserService
  ) {}

  storeWorkout$(workout: WorkoutRequest): Observable<Workout> {
    const authUrl = `${environment.apiUrl}/workouts`;
    return this.http.post<WorkoutResponse>(authUrl, workout).pipe(
      map((workout) => {
        return workout.workouts;
      })
    );
  }

  getWorkoutFromId$(workoutId: any): Observable<Workout> {
    const authUrl = `${environment.apiUrl}/workouts/${workoutId}`;
    return this.http.get<Workout>(authUrl).pipe(
      map((workout) => {
        return workout;
      })
    );
  }

  getExercisesFromAWorkout$(workoutId: any): Observable<any> {
    const authUrl = `${environment.apiUrl}/workouts/${workoutId}/exercises`;
    return this.http.get<WorkoutExercisesResponse>(authUrl).pipe(
      map((exercises) => {
        return exercises;
      })
    );
  }

  updateWorkouts(workouts: Workout[]) {
    this.workoutsSubject.next(workouts);
  }

  updateWorkout$(workoutId: any, formData: FormData): Observable<Workout> {
    const authUrl = `${environment.apiUrl}/workouts/${workoutId}`;
    return this.http.put<WorkoutResponse>(authUrl, formData).pipe(
      map((workout) => {
        return workout.workouts;
      })
    );
  }

  deleteWorkout$(workoutId: any): Observable<any> {
    const authUrl = `${environment.apiUrl}/workouts/${workoutId}`;
    return this.http.delete(authUrl).pipe(
      map((workout) => {
        return workout;
      })
    );
  }

  loadWorkouts(userId: string) {
    this.userService.getWorkoutsFromAUser(userId).subscribe(
      (data) => {
        this.updateWorkouts(data.workouts);
      },
      (error) => {}
    );
  }
}
