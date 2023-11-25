import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrl: './cats-list.component.css'
})

export class CatsListComponent implements OnInit {
  cats: Cat[] = [];
  authToken: string | null = null;

  constructor(private catService: CatService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getCats();
    this.getAuthToken();
  }

  getCats(): void {
    this.catService.getAll().subscribe(cats => this.cats = cats);
  }

  getAuthToken(): void {
    this.authToken = this.authService.getAuthTokenAsString();
  }

  goToChat(): void {
    localStorage.setItem('IsLoadedBefore', 'false');
    this.router.navigate(['chat']);
  }
}
