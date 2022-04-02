import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewassetRoutingModule } from './viewasset-routing.module';
import { ViewassetComponent } from './viewasset.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    ViewassetRoutingModule,
    ComponentsModule, FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
  declarations: [ViewassetComponent],
  providers : [DatePipe]
})
export class ViewassetModule { }
