import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})

export class AddUserComponent implements OnInit{
  user: User = {}

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.createNewUser();
  }

  createNewUser(): void {
    this.user = new User();
  }

  createUser(): void {
    this.userService.create(this.user).subscribe(message => {console.log(message), this.router.navigate(['login'])});
  }
}
