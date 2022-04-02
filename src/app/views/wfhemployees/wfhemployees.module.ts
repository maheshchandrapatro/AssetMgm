import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { WfhemployeesComponent } from './wfhemployees.component';
import { WfhemployeesRoutingModule } from './wfhemployees-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
@NgModule({
  imports: [
    CommonModule,
    WfhemployeesRoutingModule,
    ComponentsModule, FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AgGridModule.withComponents(WfhemployeesComponent),
  ],
  declarations: [WfhemployeesComponent],
  providers : [DatePipe,]
})
export class WfhemployeesModule { }
