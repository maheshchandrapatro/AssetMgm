import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Assets } from 'src/app/models/assets';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';

@Component({
  selector: 'app-newasset',
  templateUrl: './newasset.component.html',
  styleUrls: ['./newasset.component.scss'],
})
export class NewassetComponent implements OnInit {
  //@ViewChild('serviceTag') searchElement!: ElementRef;
  isShown: boolean = false;
  assetModel: any = {};
  employeeId: any;
  drpAssetTypes: any;
  employeeDetails: any;
  isShow!: boolean;
  assetDetails: any;
  selected: any;
  submitted: boolean = false;
  isSaveAllowed: boolean = false;
  today: any = new Date();
  assetData: any;
  displayStyle: any;
  isRecordExists: any;
  isEdit: any;
  AssetData: any;
  displayStyleee: any;
  assignedEmployeeId: any;
  isEditable: boolean = false;
  constructor(
    private httpservice: HttpService,
    private toastr: ToastrService,
    private helper: CommonService,
    private datePipe: DatePipe
  ) {
    this.assetModel = new Assets();
    this.assetModel.assignedDate = this.datePipe.transform(
      this.today,
      'yyyy-MM-dd'
    );
  }

  ngOnInit(): void {
    this.getAssetTypes();
    this.assetModel.location = 'Office';
    this.assetModel.assignmentType = 'New';
    this.assetModel.others = '1';
    this.isEditable = true;
    //this.searchElement.nativeElement.focus();
  }

  // Show and hide the Add Asset drpdwn
  toggleShow() {
    this.assetModel = new Assets();
    this.isShown = !this.isShown;
  }

  // To get the Employee Details
  getEmployeeDetails() {
    this.submitted = true;
    if (this.helper.isNullOrEmpty(this.employeeId)) {
      this.toastr.warning('EmployeeId is Required');
      return;
    }
    let url = 'employee/getemployeesbyid?empid=' + this.employeeId;
    this.httpservice.getData(url).subscribe(
      (data: any) => {
        if (data.data.length == 0) {
          this.toastr.warning('No Employee Information Found');
        } else {
          this.toastr.success('Employee Information Fetched Successfully');
          this.employeeDetails = data.data[0];
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.isShow = !this.isShow;
  }

  //TO get AssetType Details
  getAssetTypes() {
    let dataUrl = 'asset/getassettypes';
    this.httpservice.getData(dataUrl).subscribe(
      (data: any) => {
        this.drpAssetTypes = data.data;

        // console.log(this.drpAssetTypes);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // TO get the asset by serviceTag And AssetType
  getAssetDetails() {
    this.isSaveAllowed = false;
    this.httpservice
      .getData(
        'asset/GetAssetDetailsByServiceTag?assettype=' +
          this.assetModel.assetType +
          '&servicetag=' +
          this.assetModel.serviceTag
      )
      .subscribe(
        (data: any) => {
          console.table(data.data);
          if (data.statusCode == 200 && data.data[0].status == 'Available') {
            this.assetModel = data.data[0];
            this.assetModel['assignedDate'] = new Date();
            this.assetModel.assignedDate = this.datePipe.transform(
              this.today,
              'yyyy-MM-dd'
            );
            this.toastr.info('Asset Details Populated');
            this.isSaveAllowed = true;
          } else if (data.statusCode == 200 && data.data != null) {
            this.assignedEmployeeId = data.data[0].employeeId;
            this.toastr.warning(
              'Asset assigned to employee id : ' + this.assignedEmployeeId
            );
          } else {
            this.toastr.warning(data.message);
          }
        },
        (error: any) => {
          this.toastr.error(error);
        }
      );
  }

  //Add Asset Data
  addAssetData(obj: any) {
    this.submitted = true;
    if (this.helper.isNullOrEmpty(this.employeeId)) {
      this.toastr.warning('EmployeeId is Required');
      return;
    }
    if (this.helper.isNullOrEmpty(obj.assetType)) {
      this.toastr.warning('Asset Type Required');
      return;
    }
    // if (this.helper.isNullOrEmpty(obj.assignmentType)) {
    //   this.toastr.warning('Assignment Type Required');
    //   return;
    // }
    if (this.helper.isNullOrEmpty(obj.serviceTag)) {
      this.toastr.warning('service tag required');
      return;
    }
    if (this.helper.isNullOrEmpty(obj.location)) {
      this.toastr.warning('Location is required');
      return;
    }

    // this.httpservice.getData('Employee/CheckEmployeeAsset?assettype=' +this.assetModel.assetType +'&AssetId=' +this.assetModel.id)
    // .subscribe((response: any) => {
    //   if(response.data == 0){
    //     this.assetModel.employeeId = this.employeeId;
    //     this.httpservice.create('Employee', this.assetModel).subscribe(
    //       (response: any) => {
    //         this.isShown = false;
    //         this.toastr.success('Inserted Successfully');
    //       },
    //       (error: any) => {
    //         console.log(error);
    //       }
    //     );
    //   } else{
    //     this.toastr.warning('Asset is already assigned to other employee.')
    //   }
    // });

    this.assetModel.employeeId = this.employeeId;
    this.assetModel.status = 0;
    if (this.isSaveAllowed) {
      this.httpservice.create('Employee', this.assetModel).subscribe(
        (response: any) => {
          console.log(response);
          this.isShown = false;
          this.toastr.success('Inserted Successfully');
        },
        (error: any) => {
          console.log(error);
          this.toastr.error(error);
        }
      );
    } else {
      this.toastr.warning(
        'Asset assigned to employee id : ' + this.assignedEmployeeId
      );
    }
  }

  // show Asset
  showAssetModal() {
    this.httpservice
      .getData('asset/GetAssetsByEmp?employeeId=' + this.employeeId)
      .subscribe(
        (data: any) => {
          if (data.data == null) {
            this.toastr.warning('No data Found.');
            return;
          }
          // this.dtassetTable.next('');
          // this.dtassetTable.complete();
          this.assetData = data.data;
          //console.log(this.assetData);
          this.displayStyleee = 'block';
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  closeModall() {
    this.displayStyleee = 'none';
  }

  //Form Valida
  //ngSubmit() { this.submitted = true; }

  createAsset() {
    this.displayStyle = 'block';
  }
  closeModal() {
    this.displayStyle = 'none';
  }
  getAssetData() {
    this.httpservice.getData('asset/GetAllAssets').subscribe(
      (data: any) => {
        this.AssetData = data.data;
        // console.log(this.AssetData);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  saveAsset(obj: any) {
    this.submitted = true;
    if (this.helper.isNullOrEmpty(obj.assetType)) {
      this.toastr.warning('Asset Type Required');
      return;
    }
    if (this.helper.isNullOrEmpty(obj.serviceTag)) {
      this.toastr.warning('Service Tag Required');
      return;
    }
    if (!this.isEdit) {
      this.httpservice
        .getData(
          'asset/verifyservicetag?servicetag=' +
            this.assetModel.serviceTag +
            '&id=0'
        )
        .subscribe((data: any) => {
          this.isRecordExists = data.data;
          if (this.isRecordExists == 0) {
            this.httpservice.create('Asset', this.assetModel).subscribe(
              (response: any) => {
                if (response.statusCode == 200) {
                  this.toastr.success('Inserted Successfully');
                  this.closeModal();
                  this.getAssetData();
                }
              },
              (error: any) => {
                console.log(error);
              }
            );
          } else {
            this.toastr.warning(data.message);
          }
        });
    } else {
      this.httpservice.create('Asset/update', this.assetModel).subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.getAssetData();
            this.toastr.info('Updated Successfully');
            this.closeModal();
          }
        },
        (error: any) => {
          this.toastr.error(error);
        }
      );
    }
  }

  assetTypeChanged() {
    this.isEditable = true;
    this.isEdit = false;
  }
}
