import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

import { personCircle, square, mic, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { switchMap } from 'rxjs/operators';
import { ExerciseRequest } from '../create-exercise/exerciseRequest.model';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.page.html',
  styleUrls: ['./update-exercise.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UpdateExercisePage implements AfterViewInit {
  exercise: any = {
    name: '',
    type: '',
    duration: 0,
    repetitions: 0,
    description: '',
    audio: '',
  };
  exerciseId: any;
  exerciseType: string = '';
  exerciseRequest: Partial<ExerciseRequest> = {};

  minutes = Array.from({ length: 60 }, (_, i) => i); // 0 à 59
  seconds = Array.from({ length: 60 }, (_, i) => i); // 0 à 59

  durationMinutes: number = 0;
  durationSeconds: number = 0;

  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.exerciseId = id;
          return this.exerciseService.getExerciseById$(id);
        })
      )
      .subscribe((exercise) => {
        this.exercise = exercise;
        if (this.exercise.duration) {
          this.exerciseType = 'duration';
          this.durationMinutes = Math.floor(this.exercise.duration / 60);
          this.durationSeconds = this.exercise.duration % 60;
        } else if (this.exercise.repetitions) {
          this.exerciseType = 'repetitions';
        }
      });
    addIcons({ personCircle, square, mic, trash });
    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.exerciseService
      .updateExercise$(this.exerciseId, this.exercise)
      .subscribe({
        next: async () => {
          this.exerciseService.loadExercises(this.currentUser.id);
          this.router.navigateByUrl('/library');
          const toast = await this.toastController.create({
            message: 'Exercice modifié avec succès',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: "Échec de la modification de l'exercice",
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        },
      });
  }
}
