import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartsiteService } from 'src/app/services/startsite.service';


@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  usernameInitial: string = '';

  constructor(private startsiteService: StartsiteService, private router: Router) { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(){
    const username = localStorage.getItem('username');
    this.usernameInitial = username ? username.charAt(0).toUpperCase() : '';
  }

  navigateToStartsite() {
    this.startsiteService.selectVideo(null);
    this.startsiteService.toggleAllVideos(true);
  }

  async logoutUser() {
    try {
      const response = await fetch('http://127.0.0.1:8000/authentication/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout erfolgreich');
        this.router.navigate(['/login']);
      } else {
        console.error('Fehler beim Ausloggen');
      }
    } catch (error) {
      console.error('Fehler beim Ausloggen', error);
    }
  }

}
