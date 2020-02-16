import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperMoreDetailsComponent } from './paper-more-details.component';

describe('PaperMoreDetailsComponent', () => {
  let component: PaperMoreDetailsComponent;
  let fixture: ComponentFixture<PaperMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
