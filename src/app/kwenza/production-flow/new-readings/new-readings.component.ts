import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-new-readings',
  templateUrl: './new-readings.component.html',
  styleUrls: ['./new-readings.component.scss']
})
export class NewReadingsComponent implements OnInit {

 

  savedProductionDate: any;
  assetNodeId: number;
  ProductionMonthDate: any;
  prodFlowDatastructure: Array<any>;
  prodFlowDates: Array<string>;
  assetName: string;

  overallModel: any;


  constructor(private datePipe: DatePipe, private route: ActivatedRoute, 
    private service: MainServiceService, private toastrService: ToastService, private router: Router) { 

  }

  ngOnInit(): void {
    this.savedProductionDate =  this.datePipe.transform(localStorage.getItem('SelectedProductionDate'), 'yyyy-MM-dd');
    this.dateForm.patchValue({
      SelectedDate: localStorage.getItem('SelectedProductionDate')
    })

    this.route.params.subscribe(params => {
      this.assetNodeId = +params['assetNodeId']; 
   });

   if(localStorage.getItem('SelectedProductionDate') == '' || localStorage.getItem('SelectedProductionDate') == null){

    const model ={
      AssetNodeId: this.assetNodeId,
      ProductionMonthDate: this.datePipe.transform(new Date, 'yyyy-MM-dd')
    }
   }
   else{
         const model ={
          AssetNodeId: this.assetNodeId,
          ProductionMonthDate: localStorage.getItem('SelectedProductionDate')
    }

    this.overallModel = model;

    this.service.getProdFlow(model)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.prodFlowDatastructure = resp;
      if(resp.length == 0){
        this.toastrService.warning('There are no records for this Asset. Ask administrator to configure it for you');
      }else{
        this.prodFlowDates = resp[0].productionDates;
        this.assetName = resp[0].assetName;
      }
    }, (error: any) =>{
      this.toastrService.error(error.error);
    })
  
    console.log(model);

   }


  }

  overallProduction(){

    this.router.navigate(['binmak/overall-new-readings/'+this.assetNodeId]);

    /*this.service.getOverallProdFlow(this.overallModel)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.prodFlowDatastructure = resp;
      if(resp.length == 0){
        this.toastrService.warning('There are no records for this Asset. Ask administrator to configure it for you');
      }else{
        this.prodFlowDates = resp[0].productionDates;
        this.assetName = resp[0].assetName;
      }
    }, (error: any) =>{
      this.toastrService.error(error.error);
    })*/

  }

  dateForm = new FormGroup({
    SelectedDate: new FormControl('', Validators.required)
  });

  saveProductionDate(){
    console.log(this.dateForm.value);
    localStorage.setItem('SelectedProductionDate', this.datePipe.transform(this.dateForm.value.SelectedDate, 'yyyy-MM-dd'));
    location.reload();
  }

  editReading(d){

    const model ={
      ProductionDate: d,
      AssetNodeId: this.assetNodeId,
      AssetName: this.assetName
    };

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "model": JSON.stringify(model)
      }
    };
    this.router.navigate(['binmak/new-readings-editvalue'], navigationExtras)

  }

  back(){
    this.router.navigate(['/binmak/my-assets']);
  }

}
