import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDashboardComponent } from './fruit-dashboard.component';

describe('FruitDashboardComponent', () => {
  let component: FruitDashboardComponent;
  let fixture: ComponentFixture<FruitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
