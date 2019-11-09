import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMoreDetailsComponent } from './pdf-more-details.component';

describe('PdfMoreDetailsComponent', () => {
  let component: PdfMoreDetailsComponent;
  let fixture: ComponentFixture<PdfMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
