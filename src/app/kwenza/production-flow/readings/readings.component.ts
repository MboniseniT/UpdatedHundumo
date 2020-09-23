import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent implements OnInit {

  @ViewChild('basicModal', { static: false }) basicModal: ModalDirective;

  assetId: number;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  dtOptions2: any = {};
  dtTrigger2: Subject<any> = new Subject();
  readings: Array<any>;
  isDrillBlast: boolean;
  isLoadHaul: boolean;
  isSupport: boolean;
  isFacePrep: boolean;
  isEquipmentStatus: boolean;
  asset: any;
  dateForm: FormGroup;
  isDefaultTable: boolean;
  istargetTemplateObject: boolean;
  istargetTemplateObject2: boolean;

  date: any;
  assetName: any;

  targetTemplateObject: any;

  isAdmin: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;

  constructor(private service: MainServiceService,
    private route: ActivatedRoute, private router: Router, private toastrService: ToastService) {
  }

  ngOnInit(): void {

    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isSuperAdmin = JSON.parse(localStorage.getItem('currentUser')).isSuperAdmin;
    this.isUser = JSON.parse(localStorage.getItem('currentUser')).isUser;
    this.isGuest = JSON.parse(localStorage.getItem('currentUser')).isGuest;

    this.route.params.subscribe(params => {
      this.assetId = +params['assetNodeId']; // (+) converts string 'id' to a number         
      console.log(this.assetId);
    });

    this.service.getReadingsByAssetId(this.assetId)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == null){
        this.toastrService.error('Make sure this is a productive unit, click back and try agin');
      }
      this.assetName = resp.siteName;
      this.date = resp.dateStamp;
      this.asset = resp;
    }, (error:any) =>{
      this.toastrService.error(error.error);
      console.log(error);
    });

    
    this.isDefaultTable = true;
    this.dateForm = new FormGroup({
      SelectedDate: new FormControl('', Validators.required)
    });

    this.isDrillBlast = true;
    this.isEquipmentStatus = true;
    this.isFacePrep = true;
    this.isLoadHaul = true;
    this.isSupport = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 31,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'pdfHtml5',
          className: 'custom-btn fa fa-file-pdf-o'
        },
        {
          extend: 'excelHtml5',
          className: 'custom-btn fa fa-file-excel-o',
        },
        {
          extend: 'csvHtml5',
          className: 'custom-btn fa fa-file-text-o',
        },
        {
          extend: 'print',
          className: 'custom-btn fa fa-print'
        }
      ]
    }

    let now = new Date();

    const model = {
      AssetId: this.assetId,
      ProductionDate: now
    }
    this.loadMonthlyReadings(model);

  }

  loadMonthlyReadings(model) {

    debugger;

    this.date = this.dateForm.value.SelectedDate;
    //model.date = this.date;

    if(this.date == ""){
      this.date = model.ProductionDate;
    }

    localStorage.setItem('date', this.date);

    this.service.getAssetRedings(model)
      .subscribe((resp: any) => {
        if(resp.length > 0){
          this.istargetTemplateObject = true;
          this.targetTemplateObject = resp[0];
        }

        //console.log(resp);
        this.readings = resp;
        this.dtTrigger.next();
        //console.log(this.readings);
      }, (error: any) => {
          console.log(error);
      });
  }

  loadMonthlyReadings2(model) {

    debugger;

    this.date = this.dateForm.value.SelectedDate;
    //model.date = this.date;
    localStorage.setItem('date', this.date);

    this.service.getAssetRedings(model)
      .subscribe((resp: any) => {
        if(resp.length > 0){
          this.istargetTemplateObject2 = true;
          this.targetTemplateObject = resp[0];
        }
        console.log(resp);
        this.readings = resp;
        this.dtTrigger2.next();
        console.log(this.readings);
      }, (error: any) => {
        console.log(error);
      });
  }

  back() {
    this.router.navigate(['binmak/my-assets']);
  }

  closeMonthlyReadings(){

    const model = {
      AssetId: this.assetId,
      DateStamp: this.dateForm.value.SelectedDate
    }

    if (this.dateForm.value.SelectedDate == "") {
      model.DateStamp = new Date()
      this.service.CloseMonthlyReadings(model)
      .subscribe((resp: any)=>{
        this.toastrService.success("This month's readings is closed."+this.dateForm.value.SelectedDate)
      }, (error: any)=>{
        this.toastrService.error(error.error);
      })
    } else {

      this.service.CloseMonthlyReadings(model)
      .subscribe((resp: any)=>{
        this.toastrService.success("This month's readings is closed."+this.dateForm.value.SelectedDate)
      }, (error: any)=>{
        this.toastrService.error(error.error);
      })
    }
  }

  closed(e){
    this.toastrService.warning("This month's readings is closed."+this.dateForm.value.SelectedDate)
  }

  drillBlast() {
    this.isDrillBlast = !!this.isDrillBlast;
  }

  equipStatus() {
    this.isEquipmentStatus = !this.isEquipmentStatus;
  }

  editReading(reading) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "reading": JSON.stringify(reading)
      }
    };

    this.router.navigate(['/binmak/edit-readings'], navigationExtras);

  }

  setTarget() {

    const model = {
      AssetId: this.assetId,
      ProductionDate: this.dateForm.value.SelectedDate
    }

    debugger;

    console.log(model);

    if (model.ProductionDate == "") {
      model.ProductionDate = new Date();
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model": JSON.stringify(model)
        }
      };

      this.router.navigate(['/binmak/limits'], navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model": JSON.stringify(model)
        }
      };

      this.router.navigate(['/binmak/limits'], navigationExtras);

    }
  }

  monthlyReport(){
    const model = {
      AssetId: this.assetId,
      ProductionDate: this.dateForm.value.SelectedDate
    }

    console.log(model);

    if (model.ProductionDate == "") {
      model.ProductionDate = new Date();

      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model": JSON.stringify(model)
        }
      };
      this.router.navigate(['/binmak/overall-production'], navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model": JSON.stringify(model)
        }
      };
      this.router.navigate(['/binmak/overall-production'], navigationExtras);

    }
  }

  monthlyMonthlyReadings() {

    this.isDefaultTable = false;

    const model = {
      AssetId: this.assetId,
      ProductionDate: this.dateForm.value.SelectedDate
    }

    if (model.ProductionDate == "") {
      const model = {
        AssetId: this.assetId,
        ProductionDate: new Date()
      }
      this.loadMonthlyReadings2(model);
    } else {
      this.loadMonthlyReadings2(model);
    }

  }

  public getSheColor(value){

    if(value > 0){
      return "red";
    }
    else{
      return "white";
    }
  }

  public getColor(value, target, budget): string{

    if(value == 0){
      return "white"
    }

    if(target == 0 && value == 0){
        return "white"
    }

    if(budget == 0 && value < target){
      return "red"
    }

    if(budget == 0 && value > target && target!=0){
      return "limegreen"
    }

    if((value >= budget && value < target && budget !=0)){
      return "orange"
    }

    if((value > budget && value >= target && budget !=0)){
      return "limegreen"
    }

    if((value <= budget && value < target && budget !=0)){
      return "red"
    }

    if(target == budget && budget !=0){
      return "orange"
    }




}

  facePrep() {
    this.isFacePrep = !this.isFacePrep;
  }

  support() {
    this.isSupport = !this.isSupport;
  }

  loadHaul() {
    this.isLoadHaul = !this.isLoadHaul;
  }

}
