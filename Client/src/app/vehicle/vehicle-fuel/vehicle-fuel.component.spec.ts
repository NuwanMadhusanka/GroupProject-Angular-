import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFuelComponent } from './vehicle-fuel.component';

describe('VehicleFuelComponent', () => {
  let component: VehicleFuelComponent;
  let fixture: ComponentFixture<VehicleFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
