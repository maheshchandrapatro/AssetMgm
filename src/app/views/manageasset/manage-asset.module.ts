import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ManageassetComponent } from './manageasset.component';
import { ManageAssetRoutingModule } from './manage-asset-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ManageAssetRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  declarations: [ManageassetComponent],
  providers : [DatePipe]
})
export class ManageAssetModule { }
