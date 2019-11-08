import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfAddComponent } from './pdf-add.component';

describe('PdfAddComponent', () => {
  let component: PdfAddComponent;
  let fixture: ComponentFixture<PdfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
