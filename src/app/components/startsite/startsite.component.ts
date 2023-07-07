import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-startsite',
  templateUrl: './startsite.component.html',
  styleUrls: ['./startsite.component.scss']
})
export class StartsiteComponent implements OnInit {

  videos: any[] = [];

  showQualityMenu = false;
  isFullscreen = false;

  showDropdown = false;

  constructor() {}

  ngOnInit(): void {
    this.getVideos();
  }

  async getVideos(){
    const requestOptions : RequestInit = {
      method: 'GET',
    };

    await fetch("http://127.0.0.1:8000/v1/videos", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.videos = result; // Speichere die Videos im Array
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  playVideo(videoElement: HTMLVideoElement) {
    videoElement.play();
    videoElement.controls = true;
  }

  pauseVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
    videoElement.controls = false;
  }

  togglePlayPause(videoElement: HTMLVideoElement) {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectQuality(quality: string) {
    // Hier kannst du den Code zur Auswahl der Qualität implementieren
  }


  changeQuality(src: string, videoElement: HTMLVideoElement) {
    videoElement.src = src;
    videoElement.load();
    videoElement.play();
  }

}
