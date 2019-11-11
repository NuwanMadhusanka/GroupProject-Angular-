import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMoreDetailsComponent } from './video-more-details.component';

describe('VideoMoreDetailsComponent', () => {
  let component: VideoMoreDetailsComponent;
  let fixture: ComponentFixture<VideoMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
