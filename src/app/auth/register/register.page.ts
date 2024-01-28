import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from 'src/app/security/register-request.model';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class RegisterPage implements OnInit {
  registerRequest: Partial<RegisterRequest> = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerRequest = {};
  }

  registerError = false;

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.registerError = false;

    this.auth.register$(this.registerRequest as RegisterRequest).subscribe({
      next: async () => {
        this.router.navigateByUrl('/login');
        const toast = await this.toastController.create({
          message: 'Vous vous êtes connecté avec succès !',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        this.registerError = true;
        const toast = await this.toastController.create({
          message: 'Échec de la connexion',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
