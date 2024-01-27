import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  constructor(private auth: AuthService, private router: Router) {
    this.registerRequest = {};
  }

  registerError = false;

  ngOnInit() {}

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.registerError = false;

    // Perform the authentication request to the API.
    // NOTE: Since our form is valid, it means that "this.authRequest" is actually
    // a perfectly valid "AuthRequest" object, and that's what we are telling TypeScript
    // here with "as AuthRequest".
    this.auth.register$(this.registerRequest as RegisterRequest).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => {
        this.registerError = true;
        console.warn(`Registration failed: ${err.message}`);
      },
    });
  }
}
