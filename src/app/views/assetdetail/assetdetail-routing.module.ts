import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetdetailComponent } from './assetdetail.component';


const routes: Routes = [
  {
    path: '',
    component: AssetdetailComponent,
    data: {
      title: $localize`AssetDetails`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetDetailRoutingModule { }
