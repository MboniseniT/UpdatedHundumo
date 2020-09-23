import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-asset-register',
  templateUrl: './asset-register.component.html',
  styleUrls: ['./asset-register.component.scss']
})
export class AssetRegisterComponent implements OnInit {

  name: string;
  surname: string;
  constructor(private service: MainServiceService,
    private route: ActivatedRoute, private router: Router, private toastrService: ToastService) {
  }

  back(){
    this.router.navigate(['/binmak/kwenza']);
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;

  }

}
