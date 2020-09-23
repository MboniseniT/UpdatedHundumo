import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ToastService, ModalDirective } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('editUserModal', { static: false }) editUserModal: ModalDirective;

  userForm: FormGroup;
  //editUserForm: FormGroup;
  users: Array<any>;
  loading: boolean;
  assetId:number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  roles: Array<any>;
  groups: Array<any>;
  binmakModules: Array<any>;
  firstName: string;
  lastMame: string;
  groupAssetNodes: Array<any>;
  binmakUserModules: Array<any>;
  Id: string;
  RootId: number;

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
    .subscribe((resp:any) =>{
      this.users = resp;
      this.dtTrigger.next();
      console.log(this.users);

    }, (error: any) =>{
      this.toastrService.error(error.error);
      //location.reload();
      console.log();
    })

    this.loading = false;
    this.userForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeEmail: new FormControl('',Validators.compose([Validators.email, Validators.required])),
      RoleId: new FormControl('', Validators.required),
      GroupId: new FormControl('', Validators.required),
      BinmakModuleId: new FormControl('', Validators.required),
    });

    /*this.editUserForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeEmail: new FormControl('',Validators.compose([Validators.email, Validators.required])),
      RoleId: new FormControl('', Validators.required),
      GroupId: new FormControl('', Validators.required),
      BinmakModuleId: new FormControl('', Validators.required),
    });*/

    this.service.getRoles()
    .subscribe((resp: any) =>{
      this.roles = resp.map((t: any) => {
        return { label: t.name, value: +t.id }
      });
      
      console.log(this.roles);
    }, (error:any)=>{
      console.log(error);
      this.toastrService.error(error.error);
    })

    this.service.getBinmakModules()
    .subscribe((resp: any) =>{
      this.binmakModules = resp.map((t: any) => {
        return { label: t.binmakModuleName, value: t.binmakModuleId }
      });
      
      console.log(resp);
    }, (error:any)=>{
      console.log(error);
      this.toastrService.error(error.error);
    })

    this.service.getGroups(JSON.parse(localStorage.getItem('currentUser')).userId)
    .subscribe((resp: any) =>{
      console.log(resp);
      this.groups = resp.map((t: any) => {
        return { label: t.groupName, value: t.groupId }
      });
      console.log(this.roles);
    }, (error:any)=>{
      console.log(error);
      this.toastrService.error(error.error);
    })



  }

  reinstate(user){

    const model = {
      Id: user.id,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    if(window.confirm('Are sure you want to re-instate this user?')){
      this.service.reinstate(model)
      .subscribe((resp: any) =>{
        console.log(resp);
        location.reload();
      }, (error: any) =>{
        console.log(error);
        this.toastrService.error(error.error);
      })
   }
   else{
    console.log(user);
    this.toastrService.warning('Not Deleting...');
   }
  }

  delete(user){

    const model = {
      Id: user.id,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }


    if(window.confirm('Are sure you want to delete this user?')){
      this.service.deleteUser(model)
      .subscribe((resp: any) =>{
        console.log(resp);
        location.reload();
      }, (error: any) =>{
        console.log(error);
        this.toastrService.error(error.error);
      })
   }
   else{
    console.log(user);
    this.toastrService.error('Not Deleting...');
   }
  }
    editUserForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      EmployeeEmail: new FormControl('',Validators.compose([Validators.email, Validators.required])),
      RoleId: new FormControl('', Validators.required),
      GroupId: new FormControl('', Validators.required),
      BinmakModuleId: new FormControl('', Validators.required),
    });

  edit(user){

    this.firstName = user.name;
    this.lastMame = user.lastName;
    this.Id = user.id;
    this.RootId = user.rootId;


    console.log(user.assignedAssetNodesIds);

    this.groupAssetNodes = user.groupAssetNodes.map((t: any) => {
      return { label: t.name+' ['+t.code+']', value: t.assetNodeId }
    });

    this.binmakUserModules = user.binmakModules.map((t: any) => {
      return { label: t.binmakModuleName, value: t.binmakModuleId }
    });

    this.editUserForm.setValue({
      FirstName: user.name,
      LastName: user.lastName,
      EmployeeEmail: user.email,
      RoleId: user.roleId,
      GroupId: user.topAssetNode.assetNodeId,
      BinmakModuleId: user.assignedBinmakModulesIds
    });

    this.editUserModal.show();
    console.log(user);
  }

  editUser(){
    debugger;
    console.log(this.editUserForm.value);
    var testId = 0;
    if(this.editUserForm.value.GroupId.length > 1){
      testId = this.editUserForm.value.GroupId[0];
    }
    else{
      testId = this.editUserForm.value.GroupId;
    }

    const user = {
      FirstName: this.editUserForm.value.FirstName,
      LastName: this.editUserForm.value.LastName,
      RoleId: this.editUserForm.value.RoleId,
      AssignedAssetsNode: testId,
      BinmakModuleId: this.editUserForm.value.BinmakModuleId,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId,
      Id: this.Id,
      RootId: this.RootId
    }


    this.service.UpdateUser(user)
    .subscribe((resp: any) => {
      console.log(resp);
      this.loading = false;
      location.reload();
    }, (error: any) => {
      console.log(error);
      this.loading = false;
      this.toastrService.error(error.error);
    })

    
  }


  accessManagement(user){
    console.log(user);
    //this.router.navigate(['binmak/manage-access']);
  }

  addUser(){
    console.log(this.userForm.value);
    this.loading = true;
    const addAdmin = {
      FirstName: this.userForm.value.FirstName,
      LastName: this.userForm.value.LastName,
      Email: this.userForm.value.EmployeeEmail,
      RoleId: this.userForm.value.RoleId,
      GroupIds: this.userForm.value.GroupId,
      AssignedBinmakModulesIds: this.userForm.value.BinmakModuleId,
      Reference: JSON.parse(localStorage.getItem('currentUser')).userId
    }

    this.service.RegisterUser(addAdmin)
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

  back(){
    this.router.navigate(['/binmak']);
  }


}
