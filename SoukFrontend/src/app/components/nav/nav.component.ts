import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserDto } from 'src/app/models/user-dto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {
  currentUser: UserDto = {
    isAdmin: false
  };
  constructor(private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    if (this.authService.currentUser)
      this.currentUser = this.authService.currentUser;
    console.log(this.currentUser);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.authService.currentUser)
      this.currentUser = this.authService.currentUser;
  }

  Logout() {
    this.authService.SignOut();
  }

}
