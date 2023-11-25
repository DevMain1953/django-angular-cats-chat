import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDetailsComponent } from './cat-details.component';

describe('CatDetailsComponent', () => {
  let component: CatDetailsComponent;
  let fixture: ComponentFixture<CatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
