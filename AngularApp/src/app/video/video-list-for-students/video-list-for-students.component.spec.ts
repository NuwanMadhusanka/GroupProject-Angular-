import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListForStudentsComponent } from './video-list.component';

describe('VideoListForStudentsComponent', () => {
  let component: VideoListForStudentsComponent;
  let fixture: ComponentFixture<VideoListForStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListForStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
