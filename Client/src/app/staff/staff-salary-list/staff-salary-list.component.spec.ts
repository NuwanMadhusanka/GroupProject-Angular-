import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalaryListComponent } from './staff-salary-list.component';

describe('StaffSalaryListComponent', () => {
  let component: StaffSalaryListComponent;
  let fixture: ComponentFixture<StaffSalaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSalaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
