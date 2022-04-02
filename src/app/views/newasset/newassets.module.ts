import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewassetComponent } from './newasset.component';
import { NewAssetsRoutingModule } from './newasset-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule, FormsModule,
    ReactiveFormsModule ,
    NewAssetsRoutingModule,
    DataTablesModule
  ],
  declarations: [NewassetComponent],
  providers : [DatePipe]
})
export class NewAssetsModule {
}
