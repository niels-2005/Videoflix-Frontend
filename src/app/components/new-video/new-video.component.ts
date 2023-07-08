import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.scss']
})
export class NewVideoComponent {

  title!: string;
  description!: string;
  videofile!: any;

  constructor(private router: Router) { }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
        this.videofile = event.target.files[0];
    }
}

async uploadVideo(){
  const data = new FormData();
  data.append('created_from', localStorage.getItem('username') || '');
  data.append('title', this.title);
  data.append('description', this.description);
  data.append('video_file', this.videofile);

  const requestOptions : RequestInit = {
      method: 'POST',
      body: data
  };

  try {
      const response = await fetch("http://127.0.0.1:8000/v1/videos/", requestOptions);

      if (response.ok) {
          const result = await response.json();
          console.log(result);
          this.router.navigate(['/startsite']);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
      } else {
          const errorResponse = await response.json();
          console.log('Error:', errorResponse);
      }
  } catch (error) {
      console.log('error', error);
  }
}

}
