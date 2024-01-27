import { Component, OnDestroy } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Subscription } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { play, pause } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  standalone: true,
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class AudioPlayerComponent implements OnDestroy {
  showPlayer = false;
  private playingSubscription: Subscription;

  isPlaying = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    // Add logic to play or pause your audio
  }

  constructor(private audioService: AudioService) {
    this.playingSubscription = this.audioService.isPlaying$.subscribe(
      (isPlaying) => {
        this.showPlayer = isPlaying;
      }
    );
  }

  ngOnDestroy() {
    if (this.playingSubscription) {
      this.playingSubscription.unsubscribe();
    }
  }
}
