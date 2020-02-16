import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeactivatedListComponent } from './instructor-deactivated-list.component';

describe('InstructorDeactivatedListComponent', () => {
  let component: InstructorDeactivatedListComponent;
  let fixture: ComponentFixture<InstructorDeactivatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDeactivatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDeactivatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
