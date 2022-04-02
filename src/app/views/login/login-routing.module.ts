import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: $localize`Login`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
