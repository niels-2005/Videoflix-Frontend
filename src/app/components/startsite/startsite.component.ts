import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StartsiteService } from 'src/app/services/startsite.service';

@Component({
  selector: 'app-startsite',
  templateUrl: './startsite.component.html',
  styleUrls: ['./startsite.component.scss']
})
export class StartsiteComponent implements OnInit {

  videos: any[] = [];
  searchTerm: string = '';

  showQualityMenu = false;
  isFullscreen = false;

  showDropdown = false;

  selectedVideo: any = null;

  constructor(private startsiteService: StartsiteService) {}

  ngOnInit(): void {
    this.subscribeToStartsiteService();
    this.getVideos();
  }

  subscribeToStartsiteService() {
    this.startsiteService.showAllVideos$.subscribe(show => {
      const startsiteAllVideos = document.getElementById('startsite-all-videos');
      if (show) {
        startsiteAllVideos?.classList.remove('d-none');
      } else {
        startsiteAllVideos?.classList.add('d-none');
      }
    });

    this.startsiteService.selectedVideo$.subscribe(video => {
      this.selectedVideo = video;
    });
  }

  async getVideos(){
    const requestOptions : RequestInit = {
      method: 'GET',
    };

    await fetch("http://127.0.0.1:8000/v1/videos", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.videos = result;
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  playVideo(videoElement: HTMLVideoElement) {
    videoElement.play();
  }

  pauseVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
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

  selectVideo(video: any) {
    this.startsiteService.selectVideo(video);
    if (video) {
      this.startsiteService.toggleAllVideos(false);
    }
  }

  getDaysSinceCreation(created_at: string): string {
    const creationDate = new Date(created_at);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate.getTime() - creationDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return diffInDays === 1 ? diffInDays + ' day ago' : diffInDays + ' days ago';
  }

  onSearchInputChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
  }


  getFilteredVideos() {
    return this.searchTerm ?
      this.videos.filter(video => video.title.toLowerCase().includes(this.searchTerm)) :
      this.videos;
  }



}
