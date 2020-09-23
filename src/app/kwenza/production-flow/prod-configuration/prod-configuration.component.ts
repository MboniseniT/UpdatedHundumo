import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalDirective, ToastService } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-prod-configuration',
  templateUrl: './prod-configuration.component.html',
  styleUrls: ['./prod-configuration.component.scss']
})
export class ProdConfigurationComponent implements OnInit {

  @ViewChild('editProcessModal', { static: false }) editProcessModal: ModalDirective;

  node: any;
  assetNodeName: string;
  parent: string;
  root: string;
  name: string;
  assetNodeId: number;
  colors: Array<any>;
  loading: boolean;
  code: string;
  isAdmin: boolean;
  isBinmak: boolean;
  assetNodeProcesses: Array<any>;
  savedDate: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  proName: string;
  selectedProcessId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, 
    private service: MainServiceService, private router: Router, 
    private toastrService: ToastService, private datePipe: DatePipe) { 
    this.route.queryParams.subscribe(params => {
      this.node = JSON.parse(params["node"]);
      this.name = JSON.parse(params["node"]).name;
      this.parent = JSON.parse(params["node"]).parent;
      this.root = JSON.parse(params["node"]).root;
      this.code = JSON.parse(params["node"]).code;
      this.assetNodeId = JSON.parse(params["node"]).assetNodeId;
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

    console.log(this.node);
  }


  deleteProcess(node: any) {


    if (window.confirm('Are sure you want to delete this Process?'+ node.processName+' for '+this.name+' ('+this.code+'). This will remove all of your KPAs, Production Flow data linked.')) {
      this.service.deleteProcessById(node.processId)
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

  back(){
    this.router.navigate(['binmak/asset-setup']);
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true
    };


    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isBinmak = JSON.parse(localStorage.getItem('currentUser')).isBinmak;
    this.savedDate =  this.datePipe.transform(localStorage.getItem('SelectedDate'), 'MMMM-yyyy');
    this.dateForm.patchValue({
      SelectedDate: localStorage.getItem('SelectedDate')
    })

    this.GetAssetProcessess();
    
  }

  prodConfigForm = new FormGroup({
    ProcessDate: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ProcessName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ProcessColor: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ProcessBackgroundColor: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  editProcess(p){
    console.log(p);
    this.prodConfigForm.patchValue({
      ProcessDate: p.processDate,
      ProcessName: p.processName,
      ProcessColor: p.color,
      ProcessBackgroundColor: p.backgroundColor,
      
    });
      this.proName = p.processName;
      this.selectedProcessId = p.processId;
    this.editProcessModal.show();
  }

  editP(model){

    console.log(model);
    if(this.prodConfigForm.value.ProcessColor == this.prodConfigForm.value.ProcessBackgroundColor){
      alert('Error, Process text color can not be the same as Process background color. Choose a different color!')
    }
    else{
      console.log(this.prodConfigForm.value);

      const model = {
        AssetNodeId: this.assetNodeId,
        ProcessName: this.prodConfigForm.value.ProcessName,
        Color: this.prodConfigForm.value.ProcessColor,
        BackgroundColor: this.prodConfigForm.value.ProcessBackgroundColor,
        Reference: JSON.parse(localStorage.getItem('currentUser')).userId,
        ProcessId: this.selectedProcessId
      };

      this.service.updateProdFlowAProcess(model)
      .subscribe((resp: any) =>{
        location.reload();
      }, (error: any)=>{
        this.toastrService.error(error.error);
        console.log(error);
      })

    }

  }

  GetAssetProcessess(){

    let model = {
      AssetNodeId: this.assetNodeId,
      ProductionDate: localStorage.getItem('SelectedDate')
    }

    this.service.getProdFlowAProcess(model)
    .subscribe((resp: any) =>{
      this.assetNodeProcesses = resp;
      this.dtTrigger.next();
      console.log(resp);
    }, (error: any)=>{
      this.toastrService.error(error.error);
      console.log(error);
    })
  }

  saveProcess(){
    if(this.prodConfigForm.value.ProcessColor == this.prodConfigForm.value.ProcessBackgroundColor){
      alert('Error, Process text color can not be the same as Process background color. Choose a different color!')
    }
    else{
      console.log(this.prodConfigForm.value);

      const model = {
        AssetNodeId: this.assetNodeId,
        ProcessName: this.prodConfigForm.value.ProcessName,
        Color: this.prodConfigForm.value.ProcessColor,
        BackgroundColor: this.prodConfigForm.value.ProcessBackgroundColor,
        ProcessDate: this.prodConfigForm.value.ProcessDate,
        Reference: JSON.parse(localStorage.getItem('currentUser')).userId
      };

      this.service.saveProdFlowAProcess(model)
      .subscribe((resp: any) =>{
        location.reload();
      }, (error: any)=>{
        this.toastrService.error(error.error);
        console.log(error);
      })

    }
  }

  kpa(p){

    let kpamodel = {
      name: this.node.name,
      assetNodeId: this.node.assetNodeId,
      parent: this.node.parent,
      code: this.node.code,
      root: this.node.root,
      processId: p.processId,
      processName: p.processName,
      processDate: p.processDate,
      node: this.node
    }


      let navigationExtras: NavigationExtras = {
      queryParams: {
          "kpa": JSON.stringify(kpamodel)
      }
    };
    this.router.navigate(['binmak/kpa'], navigationExtras)
  }

  saveDate(){
    if(this.dateForm.value.SelectedDate == ''){
      alert('Error, Make sure the date is selected correctly.');
    }else{
      localStorage.setItem('SelectedDate', this.datePipe.transform(this.dateForm.value.SelectedDate, 'yyyy-MM-dd'));
      location.reload();
    }

  }

  dateForm = new FormGroup({
    SelectedDate: new FormControl('', Validators.required)
  });

}
