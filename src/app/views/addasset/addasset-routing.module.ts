import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddassetComponent } from './addasset.component';

const routes: Routes = [
  {
    path: '',
    component: AddassetComponent,
    data: {
      title: $localize`AddAsset`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddassetRoutingModule { }
