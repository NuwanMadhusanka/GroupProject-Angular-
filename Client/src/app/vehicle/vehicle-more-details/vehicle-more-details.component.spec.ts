import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMoreDetailsComponent } from './vehicle-more-details.component';

describe('VehicleMoreDetailsComponent', () => {
  let component: VehicleMoreDetailsComponent;
  let fixture: ComponentFixture<VehicleMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
