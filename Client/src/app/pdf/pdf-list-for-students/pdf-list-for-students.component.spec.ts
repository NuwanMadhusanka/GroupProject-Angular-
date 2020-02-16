import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfListForStudentsComponent } from './pdf-list-for-students.component';

describe('PdfListForStudentsComponent', () => {
  let component: PdfListForStudentsComponent;
  let fixture: ComponentFixture<PdfListForStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfListForStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfListForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
