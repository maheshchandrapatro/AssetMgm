import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WfhemployeesComponent } from './wfhemployees.component';

const routes: Routes = [
  {
    path: '',
    component: WfhemployeesComponent,
    data: {
      title: $localize`Assets`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WfhemployeesRoutingModule { }
