import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { Cat } from '../../models/cat.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.css'
})

export class CatDetailsComponent implements OnInit {
  cat: Cat = {};
  woolTypes = [
    {id: 'long', name: 'Длинношёрстая'},
    {id: 'short', name: 'Короткошёрстая'},
    {id: 'bald', name: 'Лысая'},
  ];

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCatDetails();
  }

  getCatDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catService.get(id).subscribe(cat => {this.cat.id = cat.id,
                                                this.cat.name = cat.name,
                                                this.cat.age = cat.age,
                                                this.cat.breed = cat.breed,
                                                this.cat.wool_type = cat.wool_type,
                                                this.cat.owner = cat.owner});
    }
  }

  updateCat(): void {
    this.catService.update(this.cat.id, this.cat).subscribe(message => {console.log(message), this.router.navigate([''])});
  }

  deleteCat(): void {
    this.catService.delete(this.cat.id).subscribe(message => {console.log(message), this.router.navigate([''])});
  }
}
