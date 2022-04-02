import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Assets } from 'src/app/models/assets';
import { HttpService } from 'src/app/service/http.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewasset',
  templateUrl: './viewasset.component.html',
  styleUrls: ['./viewasset.component.scss'],
})
export class ViewassetComponent implements OnInit {
  AssetData: any;
  displayStyle = 'none';
  assetModel: any = Assets;
  drpAssetTypes: any;
  isEdit: boolean = false;
  assetType: any;
  isRecordExists: number = 0;
  dtOptions: DataTables.Settings = {};
  dtaddAsset: Subject<any> = new Subject();
  form: any;
  submitted: boolean = false;
  isShowLoader: boolean = false;
  curr_date: any = new Date();

  constructor(
    private httpservice: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private helper: CommonService,
    private datePipe: DatePipe
  ) {
    this.assetModel = new Assets();
    this.assetModel.AssignedDate = this.datePipe.transform(
      this.curr_date,
      'yyyy-MM-dd'
    );
    this.assetModel.warrantyStartDate = this.datePipe.transform(
      this.curr_date,
      'dd-MM-yyyy'
    );
    this.assetModel.warrantyEndDate = this.datePipe.transform(
      this.curr_date,
      'dd-MM-yyyy'
    );
  }

  ngOnInit(): void {
    this.getAssetData();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
    this.getAssetTypes();
    this.assetModel.status = '0';
    this.assetModel.others = ''
  }

  // Get Asset Types List
  getAssetTypes() {
    this.httpservice.getData('asset/getassettypes').subscribe(
      (data: any) => {
        this.drpAssetTypes = data.data;
        // console.log(this.drpAssetTypes);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Get Assets  List
  getAssetData() {
    this.isShowLoader = true;
    this.httpservice.getData('asset/GetAllAssets').subscribe(
      (data: any) => {
        this.AssetData = data.data;
        this.dtaddAsset.next(0);
        this.dtaddAsset.complete();
        this.isShowLoader = false;
        // console.log(this.AssetData);
      },
      (error: any) => {
        console.log(error);
        this.isShowLoader = false;
      }
    );
  }

  addAssets(obj: any) {
    this.isEdit = true;
    this.saveAssets(obj);
  }

  assetTypeChanged() {
    this.isEdit = false;
  }

  saveAssets(obj: any) {
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
          'asset/verifyservicetag?servicetag=' + this.assetModel.serviceTag + '&id=0')
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

  editAsset(obj: any) {
    this.isEdit = true;
    this.assetModel.adapter = obj.adapter;
    this.assetModel.assetType = obj.assetType;
    this.assetModel.cableDetails = obj.cableDetails;
    this.assetModel.hddStorage = obj.hddStorage;
    this.assetModel.headPhoneDetails = obj.headPhoneDetails;
    this.assetModel.id = obj.id;
    this.assetModel.keyBoardDetails = obj.keyBoardDetails;
    this.assetModel.model = obj.model;
    this.assetModel.monitorDetails = obj.monitorDetails;
    this.assetModel.mouseDetails = obj.mouseDetails;
    this.assetModel.ram = obj.ram;
    this.assetModel.ssdStorage = obj.ssdStorage;
    this.assetModel.serviceTag = obj.serviceTag;
    this.assetModel.status = obj.status;
    this.assetModel.upsDetails = obj.upsDetails;
    this.assetModel.warrantyEndDate = obj.warrantyEndDate;
    this.assetModel.webCamDetails = obj.webCamDetails;
    this.assetModel.warrantyStartDate = obj.warrantyStartDate;
    this.assetModel.status = '0';
    //  this.assetModel.warrantyStartDate =this.datePipe.transform(obj.warrantyStartDate, "dd-MM-yyyy");
    this.assetModel.others =  obj.others;
    this.assetModel.productDescription =  obj.productDescription;
    this.assetModel.make =  obj.make;
    this.showAssetModal();
    console.log(this.assetModel);
  }

  showAssetModal() {
    this.displayStyle = 'block';
  }

  closeModal() {
    this.displayStyle = 'none';
    this.assetModel = new Assets();
  }

  ngOnDestroy(): void {
    this.dtaddAsset.unsubscribe();
  }
}
