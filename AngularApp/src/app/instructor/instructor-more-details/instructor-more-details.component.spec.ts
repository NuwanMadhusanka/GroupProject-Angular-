import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMoreDetailsComponent } from './instructor-more-details.component';

describe('PdfMoreDetailsComponent', () => {
  let component: InstructorMoreDetailsComponent;
  let fixture: ComponentFixture<InstructorMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
