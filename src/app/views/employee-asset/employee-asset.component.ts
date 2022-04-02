import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Assets } from 'src/app/models/assets';
import { CommonService } from 'src/app/service/common.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-employee-asset',
  templateUrl: './employee-asset.component.html',
  styleUrls: ['./employee-asset.component.scss']
})
export class EmployeeAssetComponent {

  // Employee Details
  isShown: boolean = false;
  assetModel: any = {};
  employeeId: any;
  drpAssetTypes: any;
  employeeDetails: any;
  isShow!: boolean;
  assetDetails: any;
  selected: any;
  submitted:boolean=false;
  curr_date: any;
  today : any = new Date();
  // End Employee Details

  // Assets List
  data: any;
  assetData: any;
  displayStyle = "none";
  dtOptions: DataTables.Settings = {};
  verfyServiceTag: string | undefined;
  dtassetTable: Subject<any> = new Subject();
  markAsWFH: boolean = true;
  markAsWFO: boolean = true;
  resetAsset: boolean = true;
  // End Asset List

  constructor(private httpService: HttpService, private toastr: ToastrService,private helper:CommonService,private datePipe: DatePipe, private route : Router) {
    this.assetModel = new Assets();
    this.dtOptions = {
      paging: false,
      processing: true,
      searching: true,
    };
  }

  getEmployeeDetails() {
    this.submitted=true;
    this.markAsWFH = false;
    this.markAsWFO = false;
    this.resetAsset = false;
    if(this.helper.isNullOrEmpty(this.employeeId)) {
      this.toastr.warning('EmployeeId is Required');
      return;
    }
    let url = 'employee/getemployeesbyid?empid=' + this.employeeId;
    this.httpService.getData(url).subscribe((data: any) => {
      if (data.data.length == 0) {
        this.markAsWFH = false;
        this.markAsWFO = false;
    this.resetAsset = false;
        this.toastr.warning("No Employee Information Found");
      }
      else {
        this.employeeDetails = data.data[0];

      }
      this.isShown = !this.isShown;
    }, (error: any) => {
      console.log(error);
    });

    this.showEmployeeModal(this.employeeId);
  }

  showEmployeeModal(employeeId: any){
    this.httpService.getData('asset/GetAssetsByEmp?employeeId=' + employeeId).subscribe((data: any) => {
      this.dtassetTable.next('');
      this.dtassetTable.complete();
      this.assetData = data.data;
    }, (error: any) => {
      console.log(error);
    });
    this.displayStyle = "block";
  }

  selectedAssetsList : any = [];
  getSelectedAsset(event: any,selectedAsset : any){
    if(event.target.checked)
      this.selectedAssetsList.push(selectedAsset)
    else
      this.selectedAssetsList.pop(selectedAsset)
  }


  verifyAsset(item: any, newServiceTag : any) {
    if (item.serviceTag.toLowerCase() == newServiceTag.toLowerCase()) {
      this.toastr.success('Valid Asset');
    }
    else {
      this.toastr.warning('Invalid Asset');
    }
  }

  //Move to WFH
  markAsWorkFromHome(){
    this.httpService.create('Employee/MoveToWFH ', this.selectedAssetsList).subscribe((response: any) => {
      this.toastr.success('Asset Marked as Home');
      this.showEmployeeModal(this.employeeId);
    }, (error: any) => {
      this.toastr.error(error);
      console.log(error);
    })
  }

  //Move to WFO
  markAsWorkFromOffice(){
    this.httpService.create('Employee/MoveToOffice ', this.selectedAssetsList).subscribe((response: any) => {
      this.toastr.success('Asset Marked as Office');
      this.showEmployeeModal(this.employeeId);
    }, (error: any) => {
      this.toastr.error(error);
      console.log(error);
    })
  }

  //Remove Assets
  resetAssets(){
    this.httpService.create('Employee/RemoveAsset', this.selectedAssetsList).subscribe((response: any) => {
      this.toastr.warning('Asset Removed Successfully.');
      this.showEmployeeModal(this.employeeId);
    }, (error: any) => {
      this.toastr.error(error);
      console.log(error);
    })
  }

  // checkUncheckAll(event:any,selectedAssetsList:any){
  //   for (var i = 0; i < this.assetData.length; i++) {
  //     this.assetData[i].selectedAssetsList = this.selectedAssetsList;
  //   }
  // }

  print(){
    this.helper.employeeId = this.employeeId
    this.helper.employeeName = this.employeeDetails?.empName;
    this.helper.assetData = this.assetData;

    this.route.navigate(['admin/AssetAllocation'])
  }
}
