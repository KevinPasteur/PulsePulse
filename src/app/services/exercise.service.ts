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
import { ExerciseRequest } from '../exercises/create-exercise/exerciseRequest.model';
import { Exercise } from '../exercises/create-exercise/exercise.model';
import { ExerciseResponse } from '../exercises/create-exercise/exerciseResponse.model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private exercisesSubject = new BehaviorSubject<Exercise[]>([]);
  exercises$ = this.exercisesSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private userService: UserService
  ) {}

  storeExercise$(formData: FormData): Observable<Exercise> {
    const authUrl = `${environment.apiUrl}/exercises`;

    console.log(formData);
    return this.http.post<ExerciseResponse>(authUrl, formData).pipe(
      map((exercise) => {
        console.log(exercise);
        return exercise.exercise;
      })
    );
  }

  updateExercises(exercises: Exercise[]) {
    this.exercisesSubject.next(exercises);
  }

  loadExercises(userId: string) {
    this.userService.getExercisesFromAUser(userId).subscribe(
      (data) => {
        this.updateExercises(data.exercises);
      },
      (error) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }
}
