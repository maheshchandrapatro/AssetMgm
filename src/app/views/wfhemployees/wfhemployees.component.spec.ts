import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhemployeesComponent } from './wfhemployees.component';

describe('WfhemployeesComponent', () => {
  let component: WfhemployeesComponent;
  let fixture: ComponentFixture<WfhemployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfhemployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
