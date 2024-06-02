import { Component, OnInit } from '@angular/core';
import { UserDto } from './models/user-dto';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SoukFrontend';
  currentUser: UserDto;
  constructor(private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
