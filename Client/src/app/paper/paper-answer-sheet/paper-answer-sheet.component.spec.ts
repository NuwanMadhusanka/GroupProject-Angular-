import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAnswerSheetComponent } from './paper-answer-sheet.component';

describe('PaperAnswerSheetComponent', () => {
  let component: PaperAnswerSheetComponent;
  let fixture: ComponentFixture<PaperAnswerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperAnswerSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
