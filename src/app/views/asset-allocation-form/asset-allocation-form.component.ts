import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-asset-allocation-form',
  templateUrl: './asset-allocation-form.component.html',
  styleUrls: ['./asset-allocation-form.component.scss']
})
export class AssetAllocationFormComponent implements OnInit, OnChanges {
  httpService: any;
  today:any = new Date;
  currentDate: string | null;
  assetDataHome: any;

  constructor(private http:HttpService, private commonService:CommonService,private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(this.today, 'dd-MM-yyyy');

  }

  employeeId : any
  employeeName : any;
  assetData : any;
  assetDataDesktop : any;
  assetDataLaptop : any;
  assetDataMonitor : any;
  assetDataUps : any;
  assetDataHeadset : any;
  assetDataKeyboard : any;
  assetDataMouse : any;
  assetDataMiscellaneous : any;

  ngOnInit(): void {
    this.employeeId = this.commonService.employeeId
    this.employeeName = this.commonService.employeeName
    this.assetData = this.commonService.assetData

    this.assetDataDesktop = this.assetData?.find((i: any)=> i.assetType == 'Desktop' && i.location == 'Home')
    this.assetDataLaptop = this.assetData?.find((i: any)=> i.assetType == 'Laptop' && i.location == 'Home');
    this.assetDataMonitor = this.assetData?.find((i:any)=> i.assetType == 'Monitors' && i.location == 'Home');
    this.assetDataUps = this.assetData?.find((i:any)=> i.assetType == 'UPS' && i.location == 'Home');
    this.assetDataHeadset = this.assetData?.find((i:any)=> i.assetType == 'HeadPhones' && i.location == 'Home');
    this.assetDataKeyboard = this.assetData?.find((i:any)=> i.assetType == 'KeyBoards' && i.location == 'Home');
    this.assetDataMouse = this.assetData?.find((i:any)=> i.assetType == 'Mouse' && i.location == 'Home');
    this.assetDataMiscellaneous = this.assetData?.find((i:any)=> i.assetType == 'Miscellaneous' && i.location == 'Home');
  }

  ngOnChanges(){
    // this.employeeId = this.commonService.employeeId
    // this.employeeName = this.commonService.employeeName
  }

  //print the doc
  print(){
    window.print();
  }
}
