import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  message!: string;
  showMessage: boolean = false;

  email!: string;
  password!: string;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.checkIfUserSignUp();
  }

  checkIfUserSignUp(){
    this.authService.message$.subscribe(message => {
      this.message = message;
      this.showMessage = true;
      this.hideSuccessMessage();
      this.switchContainer(
        'sign-up-content',
        'already-sign-up-content',
        'login-content',
        'new-to-videoflix-content'
      );
    });
  }

  hideSuccessMessage(){
    setTimeout(() => {
      this.showMessage = false;
    }, 1500);
  }

  switchContainer(id1: string, id2: string, id3: string, id4: string){
    document.getElementById(id1)?.classList.add('d-none')
    document.getElementById(id2)?.classList.add('d-none');
    document.getElementById(id3)?.classList.remove('d-none');
    document.getElementById(id4)?.classList.remove('d-none');
  }

  async logInUser(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": this.email,
      "password": this.password
    });

    const requestOptions : RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
};

  try {
    const response = await fetch("http://127.0.0.1:8000/authentication/login/", requestOptions);

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      this.router.navigate(['/startsite']);
      localStorage.setItem('token', result.token);
    } else {
      const errorResponse = await response.json();
      this.showSignUpErrorMessage(errorResponse.error);
      console.log('Error:', errorResponse.error);
    }
  } catch (error) {
    console.log(error);
  }
  }

  showSignUpErrorMessage(message: string) {
    const errorMessageElement = document.getElementById("log-in-error-message");
    if (errorMessageElement) {
      errorMessageElement.innerText = message;
    }
  }

  logInGuest(){
    this.router.navigate(['/startsite']);
    localStorage.setItem('token', '92308fbd0561724b7b8f7ce6f0a970ddddaadc00');
  }
}
