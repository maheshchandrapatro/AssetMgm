import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewassetComponent } from './newasset.component';


const routes: Routes = [
  {
    path: '',
    component: NewassetComponent,
    data: {
      title: $localize`New Assets`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAssetsRoutingModule { }