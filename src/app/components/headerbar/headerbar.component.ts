import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartsiteService } from 'src/app/services/startsite.service';


@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  constructor(private startsiteService: StartsiteService) { }

  ngOnInit(): void {

  }

  navigateToStartsite() {
    this.startsiteService.selectVideo(null);
    this.startsiteService.toggleAllVideos(true);
  }

}
