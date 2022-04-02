import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  employeeId : any;
  employeeName : any;
  assetData : any;
  assetDataDesktop:any;
  assetDataLaptop : any;
  assetDataMonitor:any;
  assetDataUps:any;
  assetDataHeadset:any;
  assetDataKeyboard:any;
  assetDataMouse:any;
  assetDataMiscellaneous:any;
  constructor() {
  }

  // global null checking function
  public isNullOrEmpty = function (value: any) {
    return (!value || value == undefined || value == "undefined" || value == "" || value == " " || value.length == 0);
  }

}
