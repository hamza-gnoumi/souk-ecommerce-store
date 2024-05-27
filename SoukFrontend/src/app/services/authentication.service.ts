import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly authUrl = `http://localhost:8080/api/v1/auth/login`;

  constructor(
    private http: HttpClient
  ) { }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.authUrl, authRequest);
  }
}
