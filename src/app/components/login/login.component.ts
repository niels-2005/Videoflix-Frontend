import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  switchContainer(id1: string, id2: string, id3: string, id4: string){
    document.getElementById(id1)?.classList.add('d-none')
    document.getElementById(id2)?.classList.add('d-none');
    document.getElementById(id3)?.classList.remove('d-none');
    document.getElementById(id4)?.classList.remove('d-none');
  }

}
