import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMaintainanceComponent } from './vehicle-maintainance.component';

describe('VehicleMaintainanceComponent', () => {
  let component: VehicleMaintainanceComponent;
  let fixture: ComponentFixture<VehicleMaintainanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMaintainanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
