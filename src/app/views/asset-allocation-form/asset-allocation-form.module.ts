import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/components/components.module';
import { DataTablesModule } from 'angular-datatables';
import { AssetAllocationFormComponent } from './asset-allocation-form.component';
import { AssetAllocationFormRoutingModule } from './asset-allocation-form-routing.module';


@NgModule({
  declarations: [
AssetAllocationFormComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    AssetAllocationFormRoutingModule,
    DataTablesModule,

  ],
  providers : [DatePipe]
})
export class AssetAllocationFormModule { }
