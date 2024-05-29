import { UserDto } from '../../../models/user-dto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationRequest } from 'src/app/models/user-registration-request';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegistrationRequest = {
    email: "",
    isAdmin: false,
    name: "",
    password: ""
  }
  userDto: UserDto

  errMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if (localStorage.getItem('user'))
      this.router.navigate[('shop')];
  }

  register() {

    console.log(this.user);
    this.errMsg = '';
    this.authenticationService.register(this.user)
      .subscribe({
        next: (userR) => {
          this.userDto = {
            email: userR.email,
            isAdmin: userR.isAdmin,
            name: userR.name,
            id: userR.id
          };
          localStorage.setItem('user', JSON.stringify(this.userDto));
          this.router.navigate(['shop']);
        },
        error: (err) => {
          if (err.error.statusCode === 401) {
            this.errMsg = 'Verify again';
          }
        }
      });
  }
  login() {
    this.router.navigate(['login']);
  }

}
