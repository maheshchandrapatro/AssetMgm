export class Assets {
    employeeId: number | undefined;
    location!: string;
    deskId: string | undefined;
    assignmentType!: string;
    assetType: string ='';
    assignedDate: Date= new Date();
    createdBy!: string;
    id: number | undefined;
    hddStorage!: string;
    ssdStorage!: string;
    processor!: string;
    ram!: string;
    model!: string;
    adapter!: string;
    warrantyStartDate: Date= new Date();
    warrantyEndDate: Date= new Date();
    serviceTag!: string;
    cableDetails!: string;
    headPhoneDetails!: string;
    keyBoardDetails!: string;
    monitorDetails!: string;
    mouseDetails!: string;
    upsDetails!: string;
    webCamDetails!: string;
    username! : string;
    password! : string;
    others! : string;
    status! : string;
    make! : string;
    productDescription ! : string;

}
