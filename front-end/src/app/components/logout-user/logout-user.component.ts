import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrl: './logout-user.component.css'
})

export class LogoutUserComponent {
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  logoutUser(): void {
    this.userService.deleteToken().subscribe(message => {console.log(message), this.authService.clearAuthToken(), this.router.navigate([''])});
  }
}
