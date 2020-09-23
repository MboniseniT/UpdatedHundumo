import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.scss']
})
export class ManagePermissionComponent implements OnInit {

assetNode: any;
assetNodeId: number;
name: string;

userAssetForm: FormGroup;
users: Array<any>;
assetNodes: Array<any>;
organizations: Array<any>;
loading: boolean;
assetId:number;
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
isAssetAdmin: boolean;
assetUsers: Array<any>;
assetNodesUsers: Array<any>;

constructor(private service: MainServiceService,
  private route: ActivatedRoute, private router: Router, private toastrService: ToastService) {

}

ngOnInit() {

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 7,
    processing: true
  };

  this.service.getUsers(JSON.parse(localStorage.getItem('currentUser')).userId)
  .subscribe(resp => {
      this.users = resp.map((t: any) => {
        return { label: t.name + '-' + t.lastName, value: t.id }
  })
})

  this.service.GetAssetUsers(JSON.parse(localStorage.getItem('currentUser')).userId)
  .subscribe(resp => {
    this.organizations = resp.map((t: any) => {
      return { label: t.code + '-' + t.name, value: t.assetNodeId }
    })
  })

  this.service.GetAssetNodeUsers(JSON.parse(localStorage.getItem('currentUser')).userId)
  .subscribe((resp: any) => {
    this.assetNodesUsers = resp;
    this.dtTrigger.next();
    console.log(resp);
  })



  this.loading = false;
  this.userAssetForm = new FormGroup({
    UserId: new FormControl('', Validators.required),
    AssetNodeId: new FormControl('', Validators.required)
  });

}

  back(){
    this.router.navigate(['binmak']);
  }

  assetAdmin(){
    this.isAssetAdmin = !this.isAssetAdmin;
  }

  addAssetUser(){
    console.log(this.userAssetForm.value)
    this.loading = true;

    const model = {
      UserId: this.userAssetForm.value.UserId,
      AssetNodeId: this.userAssetForm.value.AssetNodeId,
      IsAssetAdmin: this.isAssetAdmin,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    this.service.SaveAssetAssetUser(model)
    .subscribe((resp: any) => {
      console.log(resp);
      this.loading = false;
      location.reload();
    }, (error: any) => {
      console.log(error);
      this.toastrService.error(error.error);
      this.loading = false;
    })

  }

}
