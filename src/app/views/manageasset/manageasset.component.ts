import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Assets } from 'src/app/models/assets';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-manageasset',
  templateUrl: './manageasset.component.html',
  styleUrls: ['./manageasset.component.scss'],
})
export class ManageassetComponent implements OnInit {
  isShown: boolean = false;
  employeeDetails: any;
  employeeId: string | undefined;
  submitted: boolean = false;
  isAssetEdit: boolean = false;
  assetDetails: any;
  dtOptions: DataTables.Settings = {};
  dtassetTable: Subject<any> = new Subject();
  assetModel: Assets;

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private helper: CommonService,
    private datePipe: DatePipe,
    private route: Router
  ) {
    this.assetModel = new Assets();
    this.dtOptions = {
      paging: false,
      processing: true,
      searching: true,
    };
  }

  ngOnInit(): void {}

  // Get Employee Details
  getEmployeeDetails() {
    this.submitted = true;
    if (this.helper.isNullOrEmpty(this.employeeId)) {
      this.toastr.warning('EmployeeId is Required');
      return;
    }
    let url = 'employee/getemployeesbyid?empid=' + this.employeeId;
    this.httpService.getData(url).subscribe(
      (data: any) => {
        if (data.data.length == 0) {
          this.toastr.warning('No Employee Information Found');
        } else {
          this.employeeDetails = data.data[0];
        }
        this.isShown = !this.isShown;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.showEmployeeModal(this.employeeId);
  }
       
  // Show the Asset Table
  showEmployeeModal(employeeId: any) {
    this.httpService
      .getData('asset/GetAssetsByEmp?employeeId=' + employeeId)
      .subscribe(
        (data: any) => {
          this.dtassetTable.next('');
          this.dtassetTable.complete();
          this.assetDetails = data.data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  selectedAssetsList: any = [];
  getSelectedAsset(event: any, selectedAsset: any) {
    if (event.target.checked) this.selectedAssetsList.push(selectedAsset);
    else this.selectedAssetsList.pop(selectedAsset);
  }

  //Save Deski
  saveDeskId(item: any) {
    console.log(this.assetDetails);
    this.httpService.create('Employee/ManageAsset', item).subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          item.isAssetEdit = false;
          this.toastr.info('Updated Successfully');
          this.showEmployeeModal(this.employeeId);
        }
      },
      (error: any) => {
        this.toastr.error(error);
      }
    );
  }
}
