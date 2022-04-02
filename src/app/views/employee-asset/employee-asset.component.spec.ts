import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetComponent } from './employee-asset.component';

describe('EmployeeAssetComponent', () => {
  let component: EmployeeAssetComponent;
  let fixture: ComponentFixture<EmployeeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
