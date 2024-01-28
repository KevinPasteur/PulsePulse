import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { WorkoutRequest } from '../workoutRequest.model';
import { WorkoutService } from 'src/app/services/workout.service';
import { AuthService } from 'src/app/security/auth.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class CreateWorkoutPage implements OnInit {
  workoutRequest: Partial<WorkoutRequest> = {};
  currentUser: any;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.workoutService
      .storeWorkout$(this.workoutRequest as WorkoutRequest)
      .subscribe({
        next: async () => {
          this.workoutService.loadWorkouts(this.currentUser.id);
          this.router.navigateByUrl('/library');
          const toast = await this.toastController.create({
            message: 'Workout créé avec succès',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Échec de la création du workout',
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        },
      });
  }
}
