import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperMarkListComponent } from './paper-mark-list.component';

describe('PaperMarkListComponent', () => {
  let component: PaperMarkListComponent;
  let fixture: ComponentFixture<PaperMarkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperMarkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperMarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
