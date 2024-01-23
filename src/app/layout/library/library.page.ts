import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter  } from '@ionic/angular';
import { Router } from '@angular/router';
import { heart, add, playCircleOutline, ellipsisHorizontal } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from "../../security/auth.service";
import { User } from 'src/app/security/user.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LibraryPage implements ViewWillEnter {
  exercises: any[] = [];
  currentUser: any;
  selectedSegment: string = 'workouts';

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
    });

    addIcons({heart, add, playCircleOutline, ellipsisHorizontal});
  }

  ionViewWillEnter(): void {
    this.loadExercises();
  }

  loadExercises() {
    const userId = this.currentUser.id; // Obtenez l'ID de l'utilisateur
    this.userService.getExercisesFromAUser(userId).subscribe(data => {
      this.exercises = data.exercises;
      console.log(this.exercises);
    }, error => {
      console.error('Error fetching exercises:', error);
    });
  }

}
