import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-assetdetail',
  templateUrl: './assetdetail.component.html',
  styleUrls: ['./assetdetail.component.scss'],
})
export class AssetdetailComponent implements OnInit {
  dashStatus: any;
  assetName!: any;

  constructor(private httpService: HttpService) {}

  columnDef = [
    {
      headerName: 'Asset Type',
      field: 'assetType',
      sortable: true,
      filter: true,
      width: 200,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'ServiceTag',
      field: 'serviceTag',
      sortable: true,
      filter: true,
      width: 150,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'HDDStorage',
      field: 'hddStorage',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      width: 150,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Model',
      field: 'model',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'warrantySDate',
      field: 'warrantyStartDate',
      sortable: true,
      filter: true,
      width: 250,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'warrantyEDate',
      field: 'warrantyEndDate',
      sortable: true,
      filter: true,
      width: 250,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'UPSDetails',
      field: 'upsDetails',
      sortable: true,
      filter: true,
      width: 370,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
  ];
  assetData = [];
  columnDefs = [
    {
      headerName: 'Asset Type',
      field: 'assetType',
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
      headerName: 'ServiceTag',
      field: 'serviceTag',
      sortable: true,
      filter: true,
      width: 220,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      width: 220,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Adapter',
      field: 'adapter',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'HDDStorage',
      field: 'hddStorage',
      sortable: true,
      filter: true,
      width: 250,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'Model',
      field: 'model',
      width: 250,
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'WarrantySDate',
      field: 'warrantyStartDate',
      sortable: true,
      filter: true,
      width: 250,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'WarrantyEDate',
      field: 'warrantyEndDate',
      sortable: true,
      filter: true,
      width: 250,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'UPSDetails',
      field: 'upsDetails',
      sortable: true,
      filter: true,
      width: 370,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'MonitorDetails',
      field: 'monitorDetails',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'MouseDetails',
      field: 'mouseDetails',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'keyBoardDetails',
      field: 'keyBoardDetails',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
    {
      headerName: 'HeadPhoneDetails',
      field: 'headPhoneDetails',
      sortable: true,
      filter: true,
      suppressResize: true,
      floatingFilter: true,
      resizable: true,
      rowDrag: true,
    },
  ];
  assignedData = [];
  unassignedData = [];
  expiredData = [];
  ngOnInit(): void {
    this.assetName = localStorage.getItem('dsbassetName');
    this.getDashAssetType();
    if (this.assetName == 'Assigned') {
      this.getDashAssetByStatuss();
    } else if (this.assetName == 'Un Assigned') {
      this.getDashAssetByStatus();
    } else if (this.assetName == 'Expire In 3Months') {
      this.getExpiredAsset();
    }
  }
  //All Asset Data Api
  getDashAssetType() {
    this.httpService
      .getData('Reports/ReportAssetsByType?assettype=' + this.assetName)
      .subscribe((data: any) => {
        this.assetData = data.data;
      });
  }

  //UN-ASSIGNED Assets Api
  getDashAssetByStatus() {
    this.httpService
      .getData('Reports/ReportAssetsByStatus?status=1')
      .subscribe((data: any) => {
        this.unassignedData = data.data;
      });
  }
  //ASSIGNED Assets Api
  getDashAssetByStatuss() {
    this.httpService
      .getData('Reports/ReportAssetsByStatus?status=2')
      .subscribe((data: any) => {
        this.assignedData = data.data;
      });
  }
  //Expiredin3Months Api
  getExpiredAsset() {
    this.httpService
      .getData('reports/ReportAssetExpires')
      .subscribe((data: any) => {
        this.expiredData = data.data;
      });
  }
}
