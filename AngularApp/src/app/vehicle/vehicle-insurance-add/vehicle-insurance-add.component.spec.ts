import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInsuranceAddComponent } from './vehicle-insurance-add.component';

describe('VehicleInsuranceAddComponent', () => {
  let component: VehicleInsuranceAddComponent;
  let fixture: ComponentFixture<VehicleInsuranceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInsuranceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInsuranceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
