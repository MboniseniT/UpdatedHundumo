import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MdbTreeComponent } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-production-flow',
  templateUrl: './production-flow.component.html',
  styleUrls: ['./production-flow.component.scss']
})
export class ProductionFlowComponent implements OnInit {

  @ViewChild('viewAssetNodeModal', { static: false }) viewAssetNodeModal: ModalDirective;
  @ViewChild('viewTreeNodeModal', { static: false }) viewTreeNodeModal: ModalDirective;

  nodeCheckerObject: any;
  loadingNodeAction: boolean;
  model: any = {};
  loading = false;
  nodeAction: boolean;
  sameAddress = false;
  tree = false;
  sameAddressPU = false;
  sameAddressEquipment = false;
  isEquipment: boolean;
  isProductiveUnit: boolean;
  returnUrl: string;
  countries: Array<any>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedOrganizationId: number;
  selectedEquipmentId: number;
  selectedProductiveUnitId: number;
  sameAddressTogglerFlag: boolean;
  sameAddressTogglerPUFlag: boolean;
  sameAddressTogglerEFlag: boolean;
  sameAddressPUFlag = false;
  sameAddressEquipmentFlag = false;

  organizations: Array<any>;
  productiveUnits: Array<any>;
  equipments: Array<any>;

  public data1 = [
  ];


  data = [
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private router: Router, private formBuilder: FormBuilder,
    private service: MainServiceService, private authService: AuthenticationService,
    private toastrService: ToastService) { }

  ngOnInit() {

    this.tree = true;
    this.sameAddressTogglerFlag = false;
    this.sameAddressTogglerEFlag = false;
    this.sameAddressTogglerPUFlag = false;
    this.service.getTree(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe((resp: any) => {
        this.data = resp;
        //this.dtTrigger.next();
        console.log(resp);
        this.tree = false;
      }, (error: any) => {
        console.log(error);
        this.tree = false;
      });

      this.service.getAssetNodesTable(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe((resp:any)=>{
        this.data1 = resp;
        this.dtTrigger.next();
        console.log(resp);
      }, (error:any)=>{
        console.log(error)
      })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true
    };

    this.nodeAction = false;

    this.isProductiveUnit = false;
    this.isEquipment = false;
    this.loadingNodeAction = false;

    this.authService.getCountries()
      .subscribe(resp => {
        this.countries = resp.map((t: any) => {
          return { label: t.countryCode + ' ' + t.countryName, value: t.countryId }
        })
      })

    this.service.getOrganazations(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe(resp => {

        this.organizations = resp.map((t: any) => {
          return { label: t.code + '-' + t.name, value: t.assetNodeId }
        })
      })

    this.service.getEquipmentByProductiveUnit(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe(resp => {

        this.equipments = resp.map((t: any) => {
          return { label: t.code + '-' + t.name, value: t.assetNodeId }
        })
      })

    this.service.getProductiveUnits(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe(resp => {

        this.productiveUnits = resp.map((t: any) => {
          return { label: t.code + '-' + t.name, value: t.assetNodeId }
        })

      })
  }

  editAssetNodeForm = new FormGroup({
    CompanyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    CompanyCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
    OrganazationId: new FormControl(),
    EquipmentId: new FormControl(),
    ParentOrganazationId: new FormControl(),
    CountryId: new FormControl(''),
    Address: new FormControl(''),
    Address2: new FormControl(''),
    City: new FormControl(''),
    Zip: new FormControl('')
});

  Name: string;
  Code: string;
  CountryId: number;
  Address: string;
  Address2: string;
  City: string;
  Zip: number;
  AssetNodeTypeId: number;
  EquipmentId: number;
  ParentOrganazationId: number;
  AssetNodeId: number;
  node: object;

  viewNodeTree(nodeId){
debugger;
    console.log(nodeId);

    var node = this.data1.filter(x=>x.assetNodeId == nodeId)[0];

    this.Name = node.name;
    this.Code = node.code;
    this.CountryId = node.countryId;
    this.Address = node.address;
    this.Address2 = node.address2;
    this.City = node.city;
    this.Zip = node.zip;
    this.EquipmentId = node.equipmentId;
    this.AssetNodeTypeId = node.assetNodeTypeId;
    this.ParentOrganazationId = node.parentId;
    this.AssetNodeId = node.assetNodeId

    this.editAssetNodeForm.patchValue({
      CompanyName: node.name,
      CompanyCode: node.code,
      CountryId: this.CountryId,
      Address: this.Address,
      Address2: this.Address2,
      City: this.City,
      Zip: this.Zip,
      OrganazationId: node.parentId,
      EquipmentId: node.parentId,
      AssetNodeTypeId: node.assetNodeTypeId,
      ParentOrganazationId: node.parentId
    });

    this.viewAssetNodeModal.hide();
    this.viewAssetNodeModal.show();
    
  }

  viewNode(node){
    console.log(node);

    this.Name = node.name;
    this.Code = node.code;
    this.CountryId = node.countryId;
    this.Address = node.address;
    this.Address2 = node.address2;
    this.City = node.city;
    this.Zip = node.zip;
    this.EquipmentId = node.equipmentId;
    this.AssetNodeTypeId = node.assetNodeTypeId;
    this.ParentOrganazationId = node.parentId;
    this.AssetNodeId = node.assetNodeId

    this.editAssetNodeForm.patchValue({
      CompanyName: node.name,
      CompanyCode: node.code,
      CountryId: this.CountryId,
      Address: this.Address,
      Address2: this.Address2,
      City: this.City,
      Zip: this.Zip,
      OrganazationId: node.parentId,
      EquipmentId: node.parentId,
      AssetNodeTypeId: node.assetNodeTypeId,
      ParentOrganazationId: node.parentId
    });


    this.viewAssetNodeModal.show();
    
  }

  nodeObject: any;
  name: string;
  code: string;
  country: string;
  address: string;
  zip: string;
  NodeType: string;
  city: string;
  parent: string;
  root: string;
  assetNodeType: string;
  nodeTreeId: number;
  
  clickTree($event){

    debugger;

    this.nodeObject = this.data1.filter(x=>x.assetNodeId == $event.nodeId)[0];
    console.log(this.nodeObject);
    this.name = this.nodeObject.name;
    this.code = this.nodeObject.code;
    this.country = this.nodeObject.country;
    this.city = this.nodeObject.city;
    this.address = this.nodeObject.address;
    this.parent = this.nodeObject.parent;
    this.root = this.nodeObject.root;
    this.assetNodeType = this.nodeObject.assetNodeType;
    this.nodeTreeId = this.nodeObject.assetNodeId;

    console.log(this.data1);
    console.log($event);
    this.viewTreeNodeModal.show();

  }

  back() {
    this.router.navigate(['binmak/kwenza']);
  }

  accessReadings(node){
    this.router.navigate(['binmak/asset-readings', node.assetNodeId]);
  }

  newAccessReadings(node){
    this.router.navigate(['binmak/new-asset-readings', node.assetNodeId]);
  }

  accessCharts(node){
      this.router.navigate(['/binmak/charts/'+node.assetNodeId]);
  }

  accessParentCharts(node){
    this.router.navigate(['/binmak/parent-charts/'+node.assetNodeId]);
  }



}
