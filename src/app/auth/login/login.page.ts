import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthRequest } from '../../security/auth-request.model';
import { AuthService } from '../../security/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LoginPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   *
   * NOTE: The "Partial<AuthRequest>" type here has the same properties as "AuthRequest",
   * but they are all optional.
   */
  authRequest: Partial<AuthRequest> = {};

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.authRequest = {};
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    // NOTE: Since our form is valid, it means that "this.authRequest" is actually
    // a perfectly valid "AuthRequest" object, and that's what we are telling TypeScript
    // here with "as AuthRequest".
    this.auth.logIn$(this.authRequest as AuthRequest).subscribe({
      next: async () => {
        this.router.navigateByUrl('/library');
        const toast = await this.toastController.create({
          message: 'Vous vous êtes connecté avec succès !',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        this.loginError = true;
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
