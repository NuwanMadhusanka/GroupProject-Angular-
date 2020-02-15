import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignComponent } from './instructor-assign.component';

describe('InstructorAssignComponent', () => {
  let component: InstructorAssignComponent;
  let fixture: ComponentFixture<InstructorAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
