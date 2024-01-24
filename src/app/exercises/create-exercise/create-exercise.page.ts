import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  exerciseError = false;

  currentUser: any;

  constructor(
    private exerciseService: ExerciseService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
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
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e: any) => {
        this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = (e: any) => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.audioPlayer.nativeElement.src = this.audioUrl;

        this.audioChunks = [];
        this.changeDetector.detectChanges();
      };
    });
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    if (form.invalid) {
      return;
    }

    if (this.audioUrl) {
      formData.append('audio', this.audioBlob);
    }

    formData.append('data', JSON.stringify(this.exerciseRequest));

    this.exerciseService.storeExercise$(formData).subscribe({
      next: () => {
        this.exerciseService.loadExercises(this.currentUser.id);
        this.router.navigateByUrl('/library');
      },
      error: (err) => {
        console.warn(`Authentication failed: ${err.message}`);
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
