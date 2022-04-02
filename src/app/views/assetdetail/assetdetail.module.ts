import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssetDetailRoutingModule } from './assetdetail-routing.module';
import { AssetdetailComponent } from './assetdetail.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AssetDetailRoutingModule,
    AgGridModule
  ],
  declarations: [AssetdetailComponent],
  providers : [DatePipe]
})
export class AssetDetailModule { }
