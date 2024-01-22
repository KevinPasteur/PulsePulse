import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { heart, add, playCircleOutline, ellipsisHorizontal } from "ionicons/icons";
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LibraryPage {
  selectedSegment: string = 'workouts';

  constructor(private router: Router) {
    addIcons({heart, add, playCircleOutline, ellipsisHorizontal});
  }

}
