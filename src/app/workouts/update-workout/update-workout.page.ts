import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.page.html',
  styleUrls: ['./update-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UpdateWorkoutPage implements OnInit {
  workout: any = {
    name: '',
    description: '',
    bodyPart: '',
    isPublic: false,
  };

  currentUser: any;
  workoutId: any;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.workoutId = id;
          return this.workoutService.getWorkoutFromId$(id);
        })
      )
      .subscribe((exercise) => {
        this.workout = exercise;
      });

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.workoutService.updateWorkout$(this.workoutId, this.workout).subscribe({
      next: async () => {
        this.workoutService.loadWorkouts(this.currentUser.id);
        this.router.navigateByUrl('/library');
        const toast = await this.toastController.create({
          message: 'Workout modifié avec succès',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Échec de la modification du workout',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
