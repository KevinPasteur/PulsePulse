import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();
  private isPlaying = new BehaviorSubject<boolean>(true);

  isPlaying$ = this.isPlaying.asObservable();

  play(url: string = '') {
    this.audio.src = '';
    this.audio.load();
    this.audio.play();
    this.isPlaying.next(true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying.next(false);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.next(false);
  }

  updateProgress() {
    this.audio.addEventListener('timeupdate', () => {
      // Mettre à jour la progression
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      // Émettre la progression à l'aide d'un BehaviorSubject ou autre méthode
    });
  }
}
