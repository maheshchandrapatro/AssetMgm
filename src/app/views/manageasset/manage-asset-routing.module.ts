import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageassetComponent } from './manageasset.component';


const routes: Routes = [
  {
    path: '',
    component: ManageassetComponent,
    data: {
      title: $localize`Assets`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAssetRoutingModule { }
