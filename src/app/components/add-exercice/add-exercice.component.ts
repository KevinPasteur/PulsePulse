import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from '../../exercises/create-exercise/exercise.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/security/auth.service';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  standalone: true,
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class AddExerciceComponent implements OnInit {
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  searchTerm: string = '';
  currentUser: any;
  @Input() workoutId: string;

  constructor(
    private exerciseService: ExerciseService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    addIcons({ play, pause });
  }

  ngOnInit() {
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
      console.log(exercises);
      this.filteredExercises = [...this.exercises];
    });

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.loadExercises();
      }
    });
  }

  loadExercises() {
    this.exerciseService.loadExercises(this.currentUser.id);
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredExercises = this.exercises.filter((exercise) => {
        return exercise.name.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredExercises = [...this.exercises];
    }
  }

  async confirmAdd(exercise: Exercise) {
    const alert = await this.alertCtrl.create({
      header: 'Ajouter cet exercice',
      message: `Voulez-vous vraiment ajouter l'exercice "${exercise.name}" ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Ajouter',
          handler: () => {
            this.exerciseService
              .addExerciseToWorkout$(this.workoutId, exercise.id)
              .subscribe(() => {
                this.modalCtrl.dismiss(exercise, 'added');
              });
          },
        },
      ],
    });

    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
