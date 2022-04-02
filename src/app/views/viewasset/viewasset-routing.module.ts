import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewassetComponent } from './viewasset.component';

const routes: Routes = [
  {
    path: '',
    component: ViewassetComponent,
    data: {
      title: $localize`Assets`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewassetRoutingModule { }
