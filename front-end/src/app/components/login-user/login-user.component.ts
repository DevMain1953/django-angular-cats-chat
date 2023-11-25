import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})

export class LoginUserComponent implements OnInit{
  user: User = {}

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createNewUser();
  }

  createNewUser(): void {
    this.user = new User();
  }

  loginUser(): void {
    this.userService.getToken(this.user).subscribe(message => {this.authService.setAuthToken(message.token), this.router.navigate([''])});
  }
}
