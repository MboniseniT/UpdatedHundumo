import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-new-readings-editvalue',
  templateUrl: './new-readings-editvalue.component.html',
  styleUrls: ['./new-readings-editvalue.component.scss']
})
export class NewReadingsEditvalueComponent implements OnInit {

  model: any;
  productionDate: any;
  assetNodeId: number;
  assetName: string;
  productionFlowStatForm: FormGroup;
  loading: boolean;
  KPAs: Array<any>;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private service: MainServiceService, private router: Router, 
    private toastrService: ToastService, private datePipe: DatePipe) { 
    this.route.queryParams.subscribe(params => {
      this.model = JSON.parse(params["model"]);
      this.productionDate = JSON.parse(params["model"]).ProductionDate;
      this.assetNodeId = JSON.parse(params["model"]).AssetNodeId;
      this.assetName = JSON.parse(params["model"]).AssetName;
    }); 

  }

  ngOnInit(): void {

    this.productionFlowStatForm = this.fb.group({
      selectedKPAs: this.fb.array([])
    });

    this.patchForm();

  }

  back(){
    this.router.navigate(['/binmak/new-asset-readings/'+this.assetNodeId]);
  }


  patchForm() {
    this.setExpenseCategories()
    }

  setExpenseCategories() {

    this.service.GetPFEditValue(this.model)
    .subscribe((resp: any) =>{
      console.log(resp);

      if(resp.length == 0){
        this.toastrService.warning('Error, Ask administrator to complete configuration');
      }else{

        let control = <FormArray>this.productionFlowStatForm.controls.selectedKPAs;
        
        this.KPAs = resp[0].masterKPAs;
        console.log(this.KPAs);

        this.KPAs.forEach(x => {
          control.push(this.fb.group(x));
        })

      }

    }, (error:any)=>{
      console.log(error.error);
      this.toastrService.error(error.error);
    })


  }

  AddPFStat(){

    console.log(this.productionFlowStatForm.value);
    this.loading = true;

    const model = {
      AssetNodeId: this.assetNodeId,
      ProductionDate: this.productionDate,
      ValueKPAs :this.productionFlowStatForm.value.selectedKPAs,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId,
    }


    this.service.UpdateProductionValue(model)
    .subscribe((resp: any) =>{
      this.router.navigate(['binmak/new-asset-readings/'+this.assetNodeId]);
    }, (error: any) =>{
      this.toastrService.error(error.error);
    })

    console.log(model);

  }

}
