import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMoreDetailsComponent } from './staff-more-details.component';

describe('StaffMoreDetailsComponent', () => {
  let component: StaffMoreDetailsComponent;
  let fixture: ComponentFixture<StaffMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
