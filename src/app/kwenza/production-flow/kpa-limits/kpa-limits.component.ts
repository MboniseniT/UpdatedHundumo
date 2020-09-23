import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-kpa-limits',
  templateUrl: './kpa-limits.component.html',
  styleUrls: ['./kpa-limits.component.scss']
})
export class KpaLimitsComponent implements OnInit {

  node: any;
  assetNodeName: string;
  parent: string;
  root: string;
  processDate: any;
  assetNodeId: number;
  colors: Array<any>;
  loading: boolean;
  code: string;
  name: string;
  processId: number;
  isAdmin: boolean;
  isBinmak: boolean;
  processName: string;
  assetNodeProcesses: Array<any>;
  savedDate: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  kpaTypes: Array<any>;
  kpas: Array<any>;
  kpaName: string;
  kpaId: number;
  kpaDate: any;
  kapFrequency: string;
  kpaType: string;
  targetId: number;

  kpaVM: any;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private service: MainServiceService, private router: Router, 
    private toastrService: ToastService, private datePipe: DatePipe) { 
    this.route.queryParams.subscribe(params => {
      this.node = JSON.parse(params["kpa"]);
      this.parent = JSON.parse(params["kpa"]).parent;
      this.root = JSON.parse(params["kpa"]).root;
      this.code = JSON.parse(params["kpa"]).code;
      this.name = JSON.parse(params["kpa"]).name;
      this.assetNodeId = JSON.parse(params["kpa"]).assetNodeId;
      this.processId = JSON.parse(params["kpa"]).processId;
      this.processName = JSON.parse(params["kpa"]).name;
      this.processDate = JSON.parse(params["kpa"]).processDate;
      this.kpaName = JSON.parse(params["kpa"]).kpaName;
      this.kpaId = JSON.parse(params["kpa"]).kpaId;
      this.kpaDate = JSON.parse(params["kpa"]).kpaDate;
      this.kapFrequency = JSON.parse(params["kpa"]).kapFrequency;
      this.kpaType = JSON.parse(params["kpa"]).kapType
    }); 

    console.log(this.node);
  }

  kpaTargetConfigForm = new FormGroup({
    TargetValue: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Budget: new FormControl('', [Validators.required, Validators.minLength(1)]),
    Threshold: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {
    const model = {
      KeyProcessAreaId: this.kpaId,
      Month: 0,
      Year:0
    }

    this.service.getProdFlowKPALimit(model)
    .subscribe((resp:any) =>{
      console.log(resp);
      this.kpaVM = resp;

      if(resp == null){

        this.kpaTargetConfigForm.patchValue({
          TargetValue : 0,
          Budget: 0,
          Threshold: 0
        });

        this.targetId = 0;

      }else{
        this.kpaTargetConfigForm.patchValue({
          TargetValue : resp.targetValue,
          Budget: resp.budget,
          Threshold: resp.threshold
        });

        this.targetId = resp.targetId;
      }


    })
  }

  back(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "kpa": JSON.stringify(this.node)
      }
    };
    this.router.navigate(['binmak/kpa'], navigationExtras)
  }

  saveKPALimit(){
    console.log(this.kpaTargetConfigForm.value);

    const model = {
      TargetValue: this.kpaTargetConfigForm.value.TargetValue,
      Budget: this.kpaTargetConfigForm.value.Budget,
      Threshold: this.kpaTargetConfigForm.value.Threshold,
      AssetNodeId: this.assetNodeId,
      ProcessId: this.processId,
      KeyProcessAreaId: this.kpaId,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId,
      TargetId: this.targetId
    }

    console.log(model);

    this.service.saveProdFlowKPALimit(model)
    .subscribe((resp: any) =>{
      let navigationExtras: NavigationExtras = {
        queryParams: {
            "kpa": JSON.stringify(this.node)
        }
      };
      this.router.navigate(['binmak/kpa'], navigationExtras)
      console.log(resp);
    }, (error: any)=>{
      this.toastrService.error(error.error);
      console.log(error);
    })

  }

}
