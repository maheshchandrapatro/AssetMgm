import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetAllocationFormComponent } from './asset-allocation-form.component';

const routes: Routes = [
  {
    path: '',
    component: AssetAllocationFormComponent,
    data: {
      title: $localize`AssetAllocation`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetAllocationFormRoutingModule { }
