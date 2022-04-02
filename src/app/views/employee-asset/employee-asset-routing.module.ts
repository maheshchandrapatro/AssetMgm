import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAssetComponent } from './employee-asset.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeAssetComponent,
    data: {
      title: $localize`Assets`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAssetRoutingModule { }
