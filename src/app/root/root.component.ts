import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private router: Router, private service: MainServiceService) { }

  name:string;
  surname: string;
  isKwenza: boolean;
  isLitsebi: boolean;
  isBokamoso: boolean;
  isInstituteBazazi: boolean;
  isProductionFlow: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;

  ngOnInit(): void {
    this.isKwenza = true;
    this.isLitsebi = true;
    this.isBokamoso = true;
    this.isInstituteBazazi = true;
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.isAdmin = JSON.parse(localStorage.getItem('currentUser')).isAdmin;
    this.isSuperAdmin = JSON.parse(localStorage.getItem('currentUser')).isSuperAdmin;
    this.isUser = JSON.parse(localStorage.getItem('currentUser')).isUser;
    this.isGuest = JSON.parse(localStorage.getItem('currentUser')).isGuest;

    /*this.service.getAssets(JSON.parse(localStorage.getItem('currentUser')).userId)
    .subscribe((resp:any) =>{

      if(resp.length > 0){
        this.isProductionFlow = true;
      }else{
        this.isProductionFlow = false;
      }

    }, (error: any) =>{
      console.log();
    });*/

  }

  kwenza(){
    this.isKwenza = !this.isKwenza;
  }

  productionFlow(){
    if(this.isProductionFlow){
      this.router.navigate(['/admin/asset-configuration']);
    }
    else{
      this.router.navigate(['/admin/dashboard']);
    }
    
  }

  letsiba(){
    //this.isKwenza = false;
    this.isLitsebi = !this.isLitsebi;
  }

  bokamoso(){
    this.isBokamoso = !this.isBokamoso;
  }

  bazazi(){
    this.isInstituteBazazi = !this.isInstituteBazazi;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
