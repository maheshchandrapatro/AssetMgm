import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-wfhemployees',
  templateUrl: './wfhemployees.component.html',
  styleUrls: ['./wfhemployees.component.scss'],
})
export class WfhemployeesComponent implements OnInit {
  reports: any;
  isShowLoader: boolean = false;
  toastr: any;
  assetData: any;
  displayStyleee: any;
  employeeId: any;
  data: any;
  gridColumnApi: any;
  gridApi: any;
  autoGroupColumnDef: { minWidth: number };
  rowGroupPanelShow: string;
  checked =false;
  workType:any ;

  constructor(private httpservice: HttpService) {
    this.autoGroupColumnDef = { minWidth: 200 };
    this.rowGroupPanelShow = 'always';
  }

  columnDefs = [
    {
      headerName: 'Employee Id',
      field: 'employeeId',
      sortable: true,
      filter: true,
      width: 200,
      suppressResize: true,
      rowHeight: 100,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Employee Name',
      field: 'empName',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Department',
      field: 'department',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Mobile',
      field: 'contact',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'WFH Date',
      field: 'wfhDate',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Address',
      field: 'address',
      sortable: true,
      filter: true,
      width: 950,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
  ];
  rowData = [];
  wfoData = [];

  ngOnInit(): void {
    this.workType= localStorage.getItem("workType");
  }

  getwfhEmpDetails() {
    this.checked = false;
    this.isShowLoader = true;
    this.httpservice.getData('reports/ReportEmployeeWFHAssets').subscribe(
      (data: any) => {
        this.rowData = data.data;
        this.checked = false;
        // console.log(this.rowData);
        this.isShowLoader = false;
      },
      (error: any) => {
        console.log(error);
        this.isShowLoader = true;
      }
    );
  }

  //get Wfo emp details
  getWFOEmpDetails() {
    this.checked = false;
    this.isShowLoader = false;
    this.httpservice.getData('reports/ReportEmployeeOfficeAssets').subscribe(
      (data: any) => {
        this.wfoData = data.data;
        // console.log(this.wfoData);
      },
      (error: any) => {
        console.log(error);
        this.isShowLoader = false;
      }
    );
  }

  closeModall() {
    this.displayStyleee = 'none';
  }

  onRowClick(event: any) {
    // console.log(event.data.employeeId)
    this.httpservice
      .getData('asset/GetAssetsByEmp?employeeId=' + event.data.employeeId)
      .subscribe(
        (data: any) => {
          if (data.data == null) {
            this.toastr.warning('No data Found.');
            return;
          }
          this.assetData = data.data;
          this.displayStyleee = 'block';
        },
        (error: any) => {
          console.log(error);
        }
      );
    console.log('row', event);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
   // console.log(this.gridApi);
    this.gridColumnApi = params.columnApi;
    if(this.workType=="WFO"){
      this.getWFOEmpDetails();
    }
    else {
      this.getwfhEmpDetails();
    }
  }
  // toggle hide/show
  // showSwitchbtn(e:any){
  //     this.checked = !this.checked
  //  console.log(this.checked);
  // }
}
