import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageassetComponent } from './manageasset.component';

describe('ManageassetComponent', () => {
  let component: ManageassetComponent;
  let fixture: ComponentFixture<ManageassetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageassetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
