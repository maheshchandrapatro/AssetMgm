import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assets } from 'src/app/models/assets';
import { HttpService } from 'src/app/service/http.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dtDashboardData: any;
  name!: number;
  dashAssetStatus: any;
  dashAssetTyp: Assets;
  assettype: any;
  dashAssetType: any;
  dashStatus: any;

  constructor(
    private route: Router,
    private httpService: HttpService
  ) {
    this.dashAssetTyp = new Assets();
  }

  ngOnInit(): void {
    this.getDashboardReport();
  }

  //Get the Report to Dashboard
  getDashboardReport() {
    this.httpService
      .getData('reports/ReportDashboard')
      .subscribe((data: any) => {
        this.dtDashboardData = data.data;
      });
  }

  setUserColor(name: any) {
    switch (name) {
      case 'Laptop':
        return '#00c0ef';
      case 'Desktop':
        return '#00a65a';
      case 'Cables':
        return '#f39c12';
      case 'HeadPhones':
        return '#4287f5';
      case 'KeyBoards':
        return '#f39c12';
      case 'Monitors':
        return '#00c0ef';
      case 'Mouse':
        return '#a8326f';
      case 'UPS':
        return '#7332a8';
      case 'WebCams':
        return '#4287f5';
      case 'Miscellaneous':
        return '#f58442';
      case 'WFH Employees':
        return '#d9534f';
      case 'WFO Employees':
        return '#00a65a';
      case 'Expire In 3Months':
        return '#d9534f';
      case 'Assigned':
        return 'blueviolet';
      case 'Un Assigned':
        return '#4c4e59';
    }
    return null;
  }

  //widget
  widgetClick(data: any) {
    const widgetName = data.name;
    localStorage.setItem('dsbassetName', widgetName);
    switch (widgetName) {
      case 'Laptop':
      case 'Desktop':
      case 'Cables':
      case 'HeadPhones':
      case 'KeyBoards':
      case 'Monitors':
      case 'Mouse':
      case 'UPS':
      case 'WebCams':
      case 'Miscellaneous':
      case 'Assigned':
      case 'Un Assigned':
      case 'Expire In 3Months':
        this.route.navigateByUrl('admin/assetdetail');
        break;
      case 'WFH Employees':
        localStorage.setItem("workType","WFH");
        this.route.navigateByUrl('admin/wfhemployees');
        break;
      case 'WFO Employees':
        localStorage.setItem("workType","WFO")
        this.route.navigateByUrl('admin/wfhemployees');
        break;
    }
  }
}
