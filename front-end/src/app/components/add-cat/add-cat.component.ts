import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrl: './add-cat.component.css'
})

export class AddCatComponent implements OnInit {
  cat: Cat = {};
  woolTypes = [
    {id: 'long', name: 'Длинношёрстая'},
    {id: 'short', name: 'Короткошёрстая'},
    {id: 'bald', name: 'Лысая'},
  ];

  constructor(private catService: CatService, private router: Router) {}

  ngOnInit(): void {
    this.createNewCat();
  }

  createNewCat(): void {
    this.cat = new Cat();
  }

  createCat(): void {
    this.catService.create(this.cat).subscribe(message => {console.log(message), this.router.navigate([''])});
  }
}
