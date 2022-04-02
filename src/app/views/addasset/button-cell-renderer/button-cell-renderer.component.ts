import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss']
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp,OnDestroy {
  params: any;
  // refresh(params: ICellRendererParams): boolean {
  //   throw new Error("Method not implemented.");
  // }
  // private params: any;

  // agInit(params: any): void {
  //   this.params = params;
  // }

  // btnClickedHandler() {
  //   this.params.clicked(this.params.value);
  // }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  label: any;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(this.params);
      console.log(this.params)

    }
  }
}
