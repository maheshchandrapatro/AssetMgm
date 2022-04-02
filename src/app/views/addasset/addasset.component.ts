import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { ButtonCellRendererComponent } from './button-cell-renderer/button-cell-renderer.component';
@Component({
  selector: 'app-addasset',
  templateUrl: './addasset.component.html',
  styleUrls: ['./addasset.component.scss'],
})
export class AddassetComponent implements OnInit, OnDestroy {
  data: any;
  assetData: any;
  employeeId: string = '';
  selected: any;
  isShown: boolean = false;
  public employeeDetails: any;
  displayStyle = 'none';
  dtOptions: DataTables.Settings = {};
  verfyServiceTag: string | undefined;
  dtempTable: Subject<any> = new Subject();
  dtassetTable: Subject<any> = new Subject();
  isShowLoader : boolean = false;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: { btnCellRenderer: any; };

  constructor(private httpService: HttpService, private toastr: ToastrService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
    };

    this.frameworkComponents = {
      btnCellRenderer: ButtonCellRendererComponent
    };
  }
  ngOnInit(): void {
    this.getEmpDetails();
  }
// AG GRid
columnDefs=[
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
    width: 300,
    suppressResize: true,
    floatingFilter: true,
    resizable: true,
    rowDrag: true,
  },
  {
    headerName: 'Department',
    field: 'unit',
    sortable: true,
    filter: true,
    width: 300,
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
    width: 200,
    suppressResize: true,
    floatingFilter: true,
    resizable: true,
    rowDrag: true,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
    width: 300,
    suppressResize: true,
    floatingFilter: true,
    resizable: true,
    rowDrag: true,
  },
  {
    field: 'Action',
    cellRenderer: 'btnCellRenderer',
    cellRendererParams: {
      onClick: this.assign.bind(this),
      label: "View"
    },
    label: "View",
    minWidth: 250,
  }
];
// onCellClicked(params:any) {
//   alert("Cell clicked");
// }
btnCellRenderer(params:any) {
  debugger;
  return "<button (click)='assign()'>Assign me</button>";
}

assign(emp:any) {
  this.httpService
  .getData('asset/GetAssetsByEmp?employeeId=' + emp.employeeId)
  .subscribe(
    (data: any) => {
      if (data.data == null) {
        this.toastr.warning('No data Found.');
        return;
      }
      this.dtassetTable.next('');
      this.dtassetTable.complete();
      this.assetData = data.data;
      //console.log(this.assetData);
      this.displayStyle = 'block';
    },
    (error: any) => {
      console.log(error);
    }
  );}
rowData = [];
  //To get all Employee Details
  getEmpDetails() {
    this.isShowLoader = true;
    this.httpService.getData('employee').subscribe(
      (data: any) => {
        this.dtempTable.next('');
        this.dtempTable.complete();
        this.employeeDetails = data.data;
        this.rowData = data.data;
        this.isShowLoader = false;
        //console.log(data);
      },
      (error: any) => {
        console.log(error);
        this.isShowLoader = false;
      }
    );
  }

  showEmployeeModal(emp: any) {
    this.httpService
      .getData('asset/GetAssetsByEmp?employeeId=' + emp.employeeId)
      .subscribe(
        (data: any) => {
          if (data.data == null) {
            this.toastr.warning('No data Found.');
            return;
          }
          this.dtassetTable.next('');
          this.dtassetTable.complete();
          this.assetData = data.data;
          //console.log(this.assetData);
          this.displayStyle = 'block';
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  closeModal() {
    this.displayStyle = 'none';
  }
  verifyAsset(item: any, newServiceTag: any) {
    if (item.serviceTag.toLowerCase() == newServiceTag.toLowerCase()) {
      this.toastr.success('Valid Asset');
    } else {
      this.toastr.warning('Invalid Asset');
    }
  }

  ngOnDestroy(): void {
    this.dtempTable.unsubscribe();
    this.dtassetTable.unsubscribe();
  }


  // AG grid
  onGridReady(params: any) {
    this.gridApi = params.api;
    console.log(this.gridApi);
    this.gridColumnApi = params.columnApi;
    this.getEmpDetails();
  }
}
