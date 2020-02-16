import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAddComponent } from './paper-add.component';

describe('PaperAddComponent', () => {
  let component: PaperAddComponent;
  let fixture: ComponentFixture<PaperAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
