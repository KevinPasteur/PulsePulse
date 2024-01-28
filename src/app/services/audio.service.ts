import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio = new Audio();

  private isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlaying.asObservable();

  private currentTitle = new BehaviorSubject<string>('');
  currentTitle$ = this.currentTitle.asObservable();

  private currentTime = new BehaviorSubject<number>(0);
  currentTime$ = this.currentTime.asObservable();

  private duration = new BehaviorSubject<number>(0);
  duration$ = this.duration.asObservable();

  private showPlayer = new BehaviorSubject<boolean>(false);
  showPlayer$ = this.showPlayer.asObservable();

  constructor() {
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime.next(this.audio.currentTime);
    });

    this.audio.addEventListener('loadedmetadata', async () => {
      const audioContext = new window.AudioContext();
      if (this.audio.duration === Infinity) {
        const response = await fetch(this.audio.src);
        const arrayBuffer = await response.arrayBuffer();
        audioContext.decodeAudioData(arrayBuffer, ({ duration }) => {
          this.duration.next(Math.floor(duration));
        });
      } else {
        this.duration.next(Math.floor(this.audio.duration));
      }
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying.next(false); // Mettre à jour l'état de lecture
    });
  }

  play(url?: string, title?: string) {
    if (url && this.audio.src !== url) {
      this.audio.src = url;
      this.audio.load();
    }

    if (title) {
      this.currentTitle.next(title);
    }

    this.audio.play();
    this.isPlaying.next(true);
    this.showPlayer.next(true);
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

  seekTo(time: number) {
    this.audio.currentTime = time;
    if (!this.isPlaying.getValue()) {
      this.play(); // Lancer la lecture si elle est en pause
    }
  }

  hidePlayer() {
    this.showPlayer.next(false);
  }
}
