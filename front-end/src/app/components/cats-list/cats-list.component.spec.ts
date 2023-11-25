import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsListComponent } from './cats-list.component';

describe('CatsListComponent', () => {
  let component: CatsListComponent;
  let fixture: ComponentFixture<CatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
