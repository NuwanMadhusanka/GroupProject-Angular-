import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalaryPayComponent } from './staff-salary-pay.component';

describe('StaffSalaryPayComponent', () => {
  let component: StaffSalaryPayComponent;
  let fixture: ComponentFixture<StaffSalaryPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSalaryPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSalaryPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
