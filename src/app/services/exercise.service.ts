import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
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
    return this.http.post<ExerciseResponse>(authUrl, formData).pipe(
      map((exercise) => {
        return exercise.exercise;
      })
    );
  }

  updateExercises(exercises: Exercise[]) {
    this.exercisesSubject.next(exercises);
  }

  updateExercise$(exerciseId: any, formData: FormData): Observable<Exercise> {
    const authUrl = `${environment.apiUrl}/exercises/${exerciseId}`;
    return this.http.put<ExerciseResponse>(authUrl, formData).pipe(
      map((exercise) => {
        return exercise.exercise;
      })
    );
  }

  getExerciseById$(exerciseId: any): Observable<Exercise> {
    const authUrl = `${environment.apiUrl}/exercises/${exerciseId}`;
    return this.http.get<Exercise>(authUrl).pipe(
      map((exercise) => {
        return exercise;
      })
    );
  }

  deleteAnExercise$(exerciseId: any): Observable<any> {
    const authUrl = `${environment.apiUrl}/exercises/${exerciseId}`;
    return this.http.delete(authUrl).pipe(
      map((exercise) => {
        return exercise;
      })
    );
  }

  loadExercises(userId: string) {
    this.userService.getExercisesFromAUser(userId).subscribe(
      (data) => {
        this.updateExercises(data.exercises);
      },
      (error) => {}
    );
  }

  addExerciseToWorkout$(workoutId: any, exerciseId: any): Observable<any> {
    const authUrl = `${environment.apiUrl}/workouts/${workoutId}/exercises/${exerciseId}`;
    return this.http.post(authUrl, {}).pipe(
      map((exercise) => {
        return exercise;
      })
    );
  }
}
