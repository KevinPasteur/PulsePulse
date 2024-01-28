import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { personCircle, square, mic, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink, Router } from '@angular/router';

import { Exercise } from './exercise.model';
import { ExerciseRequest } from './exerciseRequest.model';
import { ExerciseService } from 'src/app/services/exercise.service';

import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class CreateExercisePage implements AfterViewInit {
  exerciseType: string = '';
  durationMinutes: number = 0;
  durationSeconds: number = 0;

  exercise: Partial<Exercise> = {};
  exerciseRequest: Partial<ExerciseRequest> = {};

  minutes = Array.from({ length: 60 }, (_, i) => i); // 0 à 59
  seconds = Array.from({ length: 60 }, (_, i) => i); // 0 à 59

  @ViewChild('audioPlayer') audioPlayer: ElementRef<HTMLAudioElement>;

  mediaRecorder: any;
  audioUrl: string = '';
  isRecording = false;
  audioChunks: Blob[] = [];
  audioBlob: Blob;

  videoFile: File;

  exerciseError = false;

  currentUser: any;

  constructor(
    private exerciseService: ExerciseService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.exercise = {};
    this.exerciseRequest = {};
    addIcons({ personCircle, square, mic, trash });

    this.authService.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      this.mediaRecorder.ondataavailable = (e: any) => {
        this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = (e: any) => {
        this.audioBlob = new Blob(this.audioChunks, {
          type: this.mediaRecorder.mimeType,
        });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.audioPlayer.nativeElement.src = this.audioUrl;

        this.audioChunks = [];
        this.changeDetector.detectChanges();
      };
    });
  }

  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.videoFile = file;
    }
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    if (form.invalid) {
      return;
    }

    if (this.audioUrl) {
      formData.append('audio', this.audioBlob);
    }

    if (this.videoFile) {
      formData.append('video', this.videoFile);
    }

    formData.append('data', JSON.stringify(this.exerciseRequest));

    this.exerciseService.storeExercise$(formData).subscribe({
      next: async () => {
        this.exerciseService.loadExercises(this.currentUser.id);
        this.router.navigateByUrl('/library');
        const toast = await this.toastController.create({
          message: 'Exercice créé avec succès',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: "Échec de la création de l'exercice",
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }

  startRecording() {
    this.mediaRecorder.start();
    this.isRecording = true;

    setTimeout(() => {
      this.stopRecording();
    }, 60000);
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
  }

  deleteAudio() {
    this.audioUrl = '';
    this.changeDetector.detectChanges();
  }
}
