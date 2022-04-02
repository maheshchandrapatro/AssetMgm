import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/components/components.module';
import { AddassetRoutingModule } from './addasset-routing.module';
import { AddassetComponent } from './addasset.component';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRendererComponent } from './button-cell-renderer/button-cell-renderer.component';


@NgModule({
  declarations: [
    AddassetComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    ComponentsModule,
    AddassetRoutingModule,
    DataTablesModule,
    AgGridModule.withComponents([ButtonCellRendererComponent]),
  ]
})
export class AddassetModule { }
