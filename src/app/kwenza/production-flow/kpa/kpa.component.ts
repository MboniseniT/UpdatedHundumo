import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-kpa',
  templateUrl: './kpa.component.html',
  styleUrls: ['./kpa.component.scss']
})
export class KpaComponent implements OnInit {

  @ViewChild('editKPAModal', { static: false }) editKPAModal: ModalDirective;

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

  kpaId: number;
  
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
      this.processName = JSON.parse(params["kpa"]).processName;
      this.processDate = JSON.parse(params["kpa"]).processDate;
    });

    this.colors = [
      {label: 'red', value: 'red'},
      {label: 'green', value: 'green'},
      {label: 'orange', value: 'orange'},
      {label: 'black', value: 'black'},
      {label: 'yellow', value: 'yellow'},
      {label: 'blue', value: 'blue'},
      {label: 'brown', value: 'brown'},
      {label: 'grey', value: 'grey'},
      {label: 'white', value: 'white'},
      {label: 'skyblue', value: 'skyblue'},
      {label: 'lightblue', value: 'lightblue'},
      {label: 'navy', value: 'navy'},
      {label: 'purple', value: 'purple'},
    ]
  }

  ngOnInit(): void {

    this.service.getKpaTypes()
    .subscribe((resp: any) =>{
      this.kpaTypes = resp.map((t: any) => {
        return { label: t.keyProcessAreaTypeName, value: t.keyProcessAreaTypeId }
      })
    })


    this.service.getKpas(this.processId)
    .subscribe((resp: any) =>{
      this.kpas = resp;
      this.dtTrigger.next();
      console.log(resp);
    }, (error: any)=>{
      this.toastrService.error(error.error);
      console.log(error);
    })
  }

  kpaConfigForm = new FormGroup({
    KpaName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    KpaColor: new FormControl('', [Validators.required, Validators.minLength(1)]),
    KpaBackgroundColor: new FormControl('', [Validators.required, Validators.minLength(1)]),
    KpaTypeId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    Frequency: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });
  

  process: string;
  editKpa(p){

      console.log(p);
      this.kpaConfigForm.patchValue({
        KpaName: p.name,
        KpaColor: p.color,
        KpaBackgroundColor: p.backgroundColor,
        KpaTypeId: p.keyProcessAreaTypeId,
        Frequency: p.frequency
      });

      this.kpaId = p.id;
      this.process = p.process;
        this.editKPAModal.show();
  }

  updateKPA(model){
    console.log(model);
    if(this.kpaConfigForm.value.KpaColor == this.kpaConfigForm.value.KpaBackgroundColor){
      alert('Error, KPA text color can not be the same as KPA background color. Choose a different color!')
    }
    else{
      console.log(this.kpaConfigForm.value);

      const model = {
        KeyProcessAreaId: this.kpaId,
        KeyProcessAreaName: this.kpaConfigForm.value.KpaName,
        Color: this.kpaConfigForm.value.KpaColor,
        BackgroundColor: this.kpaConfigForm.value.KpaBackgroundColor,
        KeyProcessAreaTypeId: this.kpaConfigForm.value.KpaTypeId,
        Frequency: this.kpaConfigForm.value.Frequency
      };

      debugger;

      this.service.updateProdFlowAKPA(model)
      .subscribe((resp: any) =>{
        location.reload();
      }, (error: any)=>{
        this.toastrService.error(error.error);
        console.log(error);
      })
  }
}

  deleteKPA(node){
    if (window.confirm('Are sure you want to delete this KPA'+ node.name+'? This will remove all of your Production Flow data linked to this KPA.')) {
      this.service.deleteKPAById(node.id)
        .subscribe((resp: any) => {
          console.log(resp);
          location.reload();
        }, (error: any) => {
          console.log(error);
          this.toastrService.error(error.error);
        })
    }
    else {
      console.log(node);
      this.toastrService.error('Not Deleting...');
    }
  }

  configureSummaryValue(p){
    console.log(p);
    this.router.navigate(['binmak/kpa-value-config/'+p.id]);
  }

  targets(p){

    let kpamodel = {
      name: this.node.name,
      assetNodeId: this.node.assetNodeId,
      parent: this.node.parent,
      code: this.node.code,
      root: this.node.root,
      processId: p.processId,
      processName: p.processName,
      processDate: p.processDate,
      node: this.node,
      kpaId: p.id,
      kpaDate: p.dateMonth,
      kpaName: p.name,
      kapFrequency: p.frequency,
      kapType: p.type
    }


      let navigationExtras: NavigationExtras = {
      queryParams: {
          "kpa": JSON.stringify(kpamodel)
      }
    };
    this.router.navigate(['binmak/kpa-limit'], navigationExtras)
  }

  back(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "node": JSON.stringify(this.node)
      }
    };
    this.router.navigate(['binmak/prod-config'], navigationExtras)
  }

  saveKPA(){
    console.log(this.kpaConfigForm.value);

    const model = {
      KeyProcessAreaName: this.kpaConfigForm.value.KpaName,
      Color: this.kpaConfigForm.value.KpaColor,
      BackgroundColor: this.kpaConfigForm.value.KpaBackgroundColor,
      Frequency: this.kpaConfigForm.value.Frequency,
      ProcessId: this.processId,
      KeyProcessAreaTypeId: this.kpaConfigForm.value.KpaTypeId,
      AssetNodeId: this.assetNodeId,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    this.service.saveProdFlowAKPA(model)
    .subscribe((resp: any) =>{
      location.reload();
      console.log(resp);
    }, (error: any)=>{
      this.toastrService.error(error.error);
      console.log(error);
    })
  
  }

}
