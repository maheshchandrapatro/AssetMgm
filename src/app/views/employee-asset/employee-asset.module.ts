import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeAssetComponent } from './employee-asset.component';
import { EmployeeAssetRoutingModule } from './employee-asset-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    EmployeeAssetRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  declarations: [EmployeeAssetComponent],
  providers : [DatePipe]
})
export class EmployeeAssetModule { }
