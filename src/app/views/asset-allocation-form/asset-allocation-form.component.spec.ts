import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocationFormComponent } from './asset-allocation-form.component';

describe('AssetAllocationFormComponent', () => {
  let component: AssetAllocationFormComponent;
  let fixture: ComponentFixture<AssetAllocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAllocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAllocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
