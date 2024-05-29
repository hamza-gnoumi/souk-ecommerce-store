import { UserDto } from '../../models/user-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { UserRegistrationRequest } from '../../models/user-registration-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authUrl = `http://localhost:8080/api/v1/auth`;

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.authUrl + '/login', authRequest);
  }
  register(userDto: UserRegistrationRequest): Observable<UserDto> {
    return this.http.post<UserDto>(this.authUrl + '/register', userDto);
  }

  SignOut() {
    localStorage.removeItem('user');
    this.router.navigate(['']);

  }
  get currentUser() {
    if (localStorage.getItem('user'))
      return JSON.parse(localStorage.getItem('user'));
    return null;

  }

}
