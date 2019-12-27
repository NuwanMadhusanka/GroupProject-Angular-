import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategoryAddComponent } from './vehicle-category-add.component';

describe('VehicleCategoryAddComponent', () => {
  let component: VehicleCategoryAddComponent;
  let fixture: ComponentFixture<VehicleCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
