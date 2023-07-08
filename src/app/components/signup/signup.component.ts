import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authSerivce: AuthenticationService) {}

  async signUpUser(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "password_again": this.confirmPassword
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/authentication/register/", requestOptions);

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        this.authSerivce.setMessage(result.message);
        localStorage.setItem('username', this.username);
      } else {
        const errorResponse = await response.json();
        console.log('Error:', errorResponse.error);
        this.showSignUpErrorMessage(errorResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  showSignUpErrorMessage(message: string) {
    const errorMessageElement = document.getElementById("sign-up-error-message");
    if (errorMessageElement) {
      errorMessageElement.innerText = message;
    }
  }


}
