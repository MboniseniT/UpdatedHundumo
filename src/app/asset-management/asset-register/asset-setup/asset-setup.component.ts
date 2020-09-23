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
  selector: 'app-asset-setup',
  templateUrl: './asset-setup.component.html',
  styleUrls: ['./asset-setup.component.scss']
})
export class AssetSetupComponent implements OnInit {

  @ViewChild('productiveUnitModal', { static: false }) productiveUnitModal: ModalDirective;
  @ViewChild('organizationModal', { static: false }) organizationModal: ModalDirective;
  @ViewChild('equipmentModal', { static: false }) equipmentModal: ModalDirective;
  @ViewChild('editAssetNodeModal', { static: false }) editAssetNodeModal: ModalDirective;
  @ViewChild('viewAssetNodeModal', { static: false }) viewAssetNodeModal: ModalDirective;


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

  onChangeTogler($event) {


    if (this.formOrganization.value.ParentOrganazationId == null) {
      this.sameAddressTogglerFlag = false;
      console.log(this.formOrganization.value.ParentOrganazationId);
    } else {
      this.sameAddressTogglerFlag = true;
      console.log(this.formOrganization.value.ParentOrganazationId);
    }
  }

  onChangeOrganization($event){

    const obj = this.data1.find(x => x.assetNodeId == $event)

      if(obj != null){
        this.formOrganization.patchValue({
        CompanyCode: obj.code
      })
    }

  }

  onChangeProductiveUnit($event){

    const obj = this.data1.find(x => x.assetNodeId == $event)

      if(obj != null){
        this.formProductiveUnit.patchValue({
          ProductiveUnitCode: obj.code
      })
    }

  }

  onChangeEquipment($event){
    const obj = this.data1.find(x => x.assetNodeId == $event)

      if(obj != null){
        this.formEquiment.patchValue({
          EquipmentCode: obj.code
      })
    }

  }

  onChangePUTogler($event) {

    if (this.formProductiveUnit.value.OrganazationId == null) {
      this.sameAddressTogglerPUFlag = false;
      console.log(this.formProductiveUnit.value.ParentOrganazationId);
    } else {
      this.sameAddressTogglerPUFlag = true;
      console.log(this.formProductiveUnit.value.ParentOrganazationId);
    }
  }

  onChangeETogler($event) {

    if (this.formEquiment.value.EquipmentId == null || this.formEquiment.value.EquipmentId == '') {
      this.sameAddressTogglerEFlag = false;
      console.log(this.formEquiment.value.EquipmentId);
    } else {
      this.sameAddressTogglerEFlag = true;
      console.log(this.formEquiment.value.EquipmentId);
    }
  }

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
        this.toastrService.error(error.error);
        this.tree = false;
      });

    this.service.getAssetNodesTable(JSON.parse(localStorage.getItem('currentUser')).userId)
      .subscribe((resp: any) => {
        this.data1 = resp;
        this.dtTrigger.next();
        console.log(resp);
      }, (error: any) => {
        this.toastrService.error(error.error);
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

        console.log(this.productiveUnits);

      })


  }


  formOrganization = new FormGroup({
    CompanyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    CompanyCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ParentOrganazationId: new FormControl(),
    CountryId: new FormControl(''),
    Address: new FormControl(''),
    Address2: new FormControl(''),
    City: new FormControl(''),
    Zip: new FormControl('')
  });

  formProductiveUnit = new FormGroup({
    ProductiveUnitName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    ProductiveUnitCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
    OrganazationId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    CountryId: new FormControl(''),
    Address: new FormControl(''),
    Address2: new FormControl(''),
    City: new FormControl(''),
    Zip: new FormControl('')
  });

  formEquiment = new FormGroup({
    EquipmentName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    EquipmentCode: new FormControl('', [Validators.required, Validators.minLength(1)]),
    EquipmentId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    CountryId: new FormControl(''),
    Address: new FormControl(''),
    Address2: new FormControl(''),
    City: new FormControl(''),
    Zip: new FormControl('')
  });

  zip: number;

  NodeAction() {
    this.loadingNodeAction = true;
    console.log(this.nodeCheckerObject);


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

  editNode(node) {
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


    this.editAssetNodeModal.show();

  }

  productionFlow(node) {

    if (window.confirm('Are sure you want to add PRODUCTION FLOW to ' + node.name + ' [' + node.code + ']?')) {
      this.service.productionFlow(node.assetNodeId)
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
      this.toastrService.error('Not Adding PRODUCTION FLOW...' + node.name + ' [' + node.code + ']');
    }


  }

  notProductionFlow(node) {

    if (window.confirm('Are sure you want to remove PRODUCTION FLOW from ' + node.name + ' [' + node.code + ']?')) {
      this.service.removeProductionFlow(node.assetNodeId)
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
      this.toastrService.error('Not removing PRODUCTION FLOW... from ' + node.name + ' [' + node.code + ']');
    }


  }

  assetSettingsWarning() {
    this.toastrService.warning("Production Flow is for productive units only!");
  }

  viewNode(node) {
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

  editAssetNode() {

    if (this.AssetNodeTypeId == 1) {

      if (this.editAssetNodeForm.value.ParentOrganazationId) {

        const model = {
          AssetNodeId: this.AssetNodeId,
          Name: this.editAssetNodeForm.value.CompanyName,
          Code: this.editAssetNodeForm.value.CompanyCode,
          ParentAssetNodeId: this.editAssetNodeForm.value.ParentOrganazationId,
          CountryId: this.editAssetNodeForm.value.CountryId,
          Address: this.editAssetNodeForm.value.Address,
          Address2: this.editAssetNodeForm.value.Address2,
          City: this.editAssetNodeForm.value.City,
          Zip: this.editAssetNodeForm.value.Zip,
          AssetNodeTypeId: 1, //1 For organization, 2 For Productive Unit, 3 For Equipment
          Reference: JSON.parse(localStorage.getItem('currentUser')).userId
        };

        console.log(model);

        if (model.ParentAssetNodeId == null) {
          model.ParentAssetNodeId = 0;
        }

        if (model.CountryId == "") {
          model.CountryId = 0;
        }

        this.service.editOrganization(model)
          .subscribe((resp: any) => {
            this.data = resp;
            console.log(resp);
            location.reload();
          }, (error: any) => {
            this.toastrService.error(error.error);
            console.log(error);
          })

      }
      else {
        alert('Make sure you have selected parent/organization!')
      }

    } else if (this.AssetNodeTypeId == 2) {

      if (this.editAssetNodeForm.value.OrganazationId) {

        const model = {
          AssetNodeId: this.AssetNodeId,
          Name: this.editAssetNodeForm.value.CompanyName,
          Code: this.editAssetNodeForm.value.CompanyCode,
          ParentAssetNodeId: this.editAssetNodeForm.value.OrganazationId,
          CountryId: this.editAssetNodeForm.value.CountryId,
          Address: this.editAssetNodeForm.value.Address,
          Address2: this.editAssetNodeForm.value.Address2,
          City: this.editAssetNodeForm.value.City,
          Zip: this.editAssetNodeForm.value.Zip,
          AssetNodeTypeId: 2, //1 For organization, 2 For Productive Unit, 3 For Equipment
          Reference: JSON.parse(localStorage.getItem('currentUser')).userId
        };

        console.log(model);

        if (model.ParentAssetNodeId == null) {
          model.ParentAssetNodeId = 0;
        }

        if (model.CountryId == "") {
          model.CountryId = 0;
        }

        this.service.editOrganization(model)
          .subscribe((resp: any) => {
            this.data = resp;
            console.log(resp);
            location.reload();
          }, (error: any) => {
            this.toastrService.error(error.error);
            console.log(error);
          })
      }
      else {
        alert('Make sure you have selected parent productive unit/organization!')
      }

    } else if (this.AssetNodeTypeId == 3) {
      if (this.editAssetNodeForm.value.EquipmentId) {

        const model = {
          AssetNodeId: this.AssetNodeId,
          Name: this.editAssetNodeForm.value.CompanyName,
          Code: this.editAssetNodeForm.value.CompanyCode,
          ParentAssetNodeId: this.editAssetNodeForm.value.EquipmentId,
          CountryId: this.editAssetNodeForm.value.CountryId,
          Address: this.editAssetNodeForm.value.Address,
          Address2: this.editAssetNodeForm.value.Address2,
          City: this.editAssetNodeForm.value.City,
          Zip: this.editAssetNodeForm.value.Zip,
          AssetNodeTypeId: 3, //1 For organization, 2 For Productive Unit, 3 For Equipment
          Reference: JSON.parse(localStorage.getItem('currentUser')).userId
        };

        console.log(model);

        if (model.ParentAssetNodeId == null) {
          model.ParentAssetNodeId = 0;
        }

        if (model.CountryId == "") {
          model.CountryId = 0;
        }

        this.service.editOrganization(model)
          .subscribe((resp: any) => {
            this.data = resp;
            console.log(resp);
            location.reload();
          }, (error: any) => {
            this.toastrService.error(error.error);
            console.log(error);
          })
      }
      else {
        alert('Make sure you have selected parent equipment/productive unit!')
      }
    }

  }

  deleteNode(node: any) {

    const model = {
      AssetNodeId: node.assetNodeId,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    if (window.confirm('Are sure you want to delete this node?')) {
      this.service.deleteAssetNodeById(model)
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

  onNodesChanged(e: any) {
    console.log('%c Returned json with marked checkboxes ', 'background: #222; color: #99ccff');
    console.table(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }

  prodFlowConfig(node){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "node": JSON.stringify(node)
      }
    };
    this.router.navigate(['binmak/prod-config'], navigationExtras)
  }


  saveOrganization() {


    if (this.sameAddress) {
      this.zip = 0;
    }
    else {
      this.zip = this.formOrganization.value.Zip;
    }

    const model = {
      Name: this.formOrganization.value.CompanyName,
      Code: this.formOrganization.value.CompanyCode,
      IsParentAddress: this.sameAddress,
      ParentAssetNodeId: this.formOrganization.value.ParentOrganazationId,
      CountryId: this.formOrganization.value.CountryId,
      Address: this.formOrganization.value.Address,
      Address2: this.formOrganization.value.Address2,
      City: this.formOrganization.value.City,
      Zip: this.zip,
      AssetNodeTypeId: 1, //1 For organization, 2 For Productive Unit, 3 For Equipment
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    };

    console.log(model);

    if (model.ParentAssetNodeId == null) {
      model.ParentAssetNodeId = 0;
    }


    if (model.CountryId == "") {
      model.CountryId = 0;
    }

    this.service.saveOrganazation(model)
      .subscribe((resp: any) => {
        this.data = resp;
        console.log(resp);
        location.reload();
      }, (error: any) => {
        console.log(error);
        this.toastrService.error(error.error);
      })


  }

  onChange($event) {

    this.isProductiveUnit = true;
    console.log($event);
    this.selectedOrganizationId = $event;

    this.formProductiveUnit.patchValue({ OrganizationId: $event });

    this.service.getProductiveUnitsByOrganization($event)
      .subscribe((resp) => {
        this.productiveUnits = resp.map((t: any) => {
          return { label: t.code + ' ' + t.name, value: t.productiveUnitId }
        })
      })

  }

  //Get Equipments
  onChangeEquipments($event) {

    this.isEquipment = true;
    console.log($event);
    this.selectedEquipmentId = $event;

    //this.formEquiment.patchValue({ ProductiveUnitId: $event });

    this.service.getEquipmentByProductiveUnit($event)
      .subscribe((resp) => {
        this.equipments = resp.map((t: any) => {
          return { label: t.code + ' ' + t.name, value: t.equipmentId }
        })
      })

  }


  saveProductiveUnit() {

    if (this.sameAddressPU) {
      this.zip = 0;
    }
    else {
      this.zip = this.formProductiveUnit.value.Zip;
    }

    const model = {
      Name: this.formProductiveUnit.value.ProductiveUnitName,
      Code: this.formProductiveUnit.value.ProductiveUnitCode,
      IsParentAddress: this.sameAddressPU,
      ParentAssetNodeId: this.formProductiveUnit.value.OrganazationId,
      CountryId: this.formProductiveUnit.value.CountryId,
      Address: this.formProductiveUnit.value.Address,
      Address2: this.formProductiveUnit.value.Address2,
      City: this.formProductiveUnit.value.City,
      Zip: this.zip,
      AssetNodeTypeId: 2, //1 For organization, 2 For Productive Unit, 3 For Equipment
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    };

    if (model.CountryId == "") {
      model.CountryId = 0;
    }

    this.service.saveOrganazation(model)
      .subscribe((resp: any) => {
        this.data = resp;
        console.log(resp);
        location.reload();
      }, (error: any) => {
        console.log(error);
        this.toastrService.error('Make sure all required field are correct!');
      });

    console.log(model);

  }


  saveEquipment() {

    if (this.sameAddressEquipment) {
      this.zip = 0;
    }
    else {
      this.zip = this.formEquiment.value.Zip;
    }


    const model = {
      Name: this.formEquiment.value.EquipmentName,
      Code: this.formEquiment.value.EquipmentCode,
      IsParentAddress: this.sameAddressEquipment,
      ParentAssetNodeId: this.formEquiment.value.EquipmentId,
      CountryId: this.formEquiment.value.CountryId,
      Address: this.formEquiment.value.Address,
      Address2: this.formEquiment.value.Address2,
      City: this.formEquiment.value.City,
      Zip: this.zip,
      AssetNodeTypeId: 3, //1 For organization, 2 For Productive Unit, 3 For Equipment
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    };



    console.log(model);

    if (model.ParentAssetNodeId == null) {
      model.ParentAssetNodeId = 0;
    }


    if (model.CountryId == "") {
      model.CountryId = 0;
    }


    this.service.saveOrganazation(model)
      .subscribe((resp: any) => {
        this.data = resp;
        console.log(resp);
        location.reload();
      }, (error: any) => {
        console.log(error);
        this.toastrService.error(error.error);
      });

    console.log(model);

  }


  sameAddressToggler() {
    this.sameAddress = !this.sameAddress;
  }

  sameAddressPUToggler() {
    this.sameAddressPU = !this.sameAddressPU;
  }

  sameAddressEquipmentoggler() {
    this.sameAddressEquipment = !this.sameAddressEquipment;
  }

  manageAccess(node) {
    this.router.navigate(['binmak/manage-access']);
  }


  back() {
    this.router.navigate(['/binmak']);
  }

  openProductiveUnit() {
    this.productiveUnitModal.show();
  }

  organization() {
    this.organizationModal.show();
  }

  equipment() {
    this.equipmentModal.show();
  }


  onCheck(e: any) {
    this.nodeAction = true;
    console.log(e);
    this.nodeCheckerObject = e;
  }

  assignUsers(node) {
    console.log(node);
  }


}
