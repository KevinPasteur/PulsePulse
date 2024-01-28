import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/security/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfilePage {
  user: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.auth.getUser$().subscribe((user) => {
      this.user = user;
    });
  }

  async logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
    const toast = await this.toastController.create({
      message: 'Vous vous êtes déconnecté avec succès !',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
