import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperListForStudentsComponent } from './paper-list-for-students.component';

describe('PaperListForStudentsComponent', () => {
  let component: PaperListForStudentsComponent;
  let fixture: ComponentFixture<PaperListForStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperListForStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperListForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
