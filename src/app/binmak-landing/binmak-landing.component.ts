import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-binmak-landing',
  templateUrl: './binmak-landing.component.html',
  styleUrls: ['./binmak-landing.component.scss']
})
export class BinmakLandingComponent implements OnInit {

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
   isGuest: boolean;
   isUser: boolean;

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
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

}
