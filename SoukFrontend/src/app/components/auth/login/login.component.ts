import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userlogin: AuthenticationRequest = {
    username: "",
    password: ""
  };
  errMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (localStorage.getItem('user'))
      this.router.navigate[('shop')];
  }

  login() {
    console.log(this.userlogin);
    this.errMsg = '';
    this.authenticationService.login(this.userlogin)
      .subscribe({
        next: (authenticationResponse) => {
          localStorage.setItem('user', JSON.stringify(authenticationResponse));
          this.router.navigate(['shop']);
        },
        error: (err) => {
          if (err.error.statusCode === 401) {
            this.errMsg = 'Login and / or password is incorrect';
          }
        }
      });
  }
  register() {
    this.router.navigate(['register']);
  }
}
