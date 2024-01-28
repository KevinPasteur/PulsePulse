import { Component, OnDestroy } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class AudioPlayerComponent implements OnDestroy {
  showPlayer = false;
  private playingSubscription: Subscription;

  currentTitle: string = '';
  currentTime: number = 0;
  duration: number = 0;

  isPlaying = true;

  togglePlay() {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
  }

  constructor(private audioService: AudioService) {
    this.showPlayer = false;
    addIcons({ play, pause });
    this.playingSubscription = this.audioService.isPlaying$.subscribe(
      (isPlaying) => {
        this.isPlaying = isPlaying;
      }
    );

    this.audioService.currentTitle$.subscribe((title) => {
      this.currentTitle = title;
    });

    this.audioService.currentTime$.subscribe((time) => {
      this.currentTime = time;
    });

    this.audioService.duration$.subscribe((newDuration) => {
      this.duration = newDuration;
    });

    this.audioService.showPlayer$.subscribe((show) => {
      this.showPlayer = show;
    });
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  }

  onSliderChange(time: number) {
    this.audioService.seekTo(time);
    this.currentTime = time;
    this.isPlaying = true;
  }

  closeAudioPlayer() {
    this.audioService.stop();
    this.showPlayer = false;
  }

  ngOnDestroy() {
    if (this.playingSubscription) {
      this.playingSubscription.unsubscribe();
    }
  }
}
