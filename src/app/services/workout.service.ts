import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  delayWhen,
  map,
  ReplaySubject,
  of,
  BehaviorSubject,
} from 'rxjs';

import { Workout } from '../workouts/workout.model';
import { WorkoutRequest } from '../workouts/workoutRequest.model';
import { WorkoutResponse } from '../workouts/workoutResponse.mode';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  workouts$ = this.workoutsSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private userService: UserService
  ) {}

  storeWorkout$(formData: FormData): Observable<Workout> {
    const authUrl = `${environment.apiUrl}/workouts`;
    return this.http.post<WorkoutResponse>(authUrl, formData).pipe(
      map((workout) => {
        return workout.workouts;
      })
    );
  }

  updateWorkouts(workouts: Workout[]) {
    this.workoutsSubject.next(workouts);
  }

  loadWorkouts(userId: string) {
    this.userService.getWorkoutsFromAUser(userId).subscribe(
      (data) => {
        this.updateWorkouts(data.workouts);
      },
      (error) => {
        console.error('Error fetching workouts:', error);
      }
    );
  }
}
