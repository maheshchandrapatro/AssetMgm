import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewassetComponent } from './newasset.component';

describe('NewassetComponent', () => {
  let component: NewassetComponent;
  let fixture: ComponentFixture<NewassetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewassetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
