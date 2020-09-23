import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-landing',
  templateUrl: './assessment-landing.component.html',
  styleUrls: ['./assessment-landing.component.scss']
})
export class AssessmentLandingComponent implements OnInit {

  name: string;
  surname: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.surname = JSON.parse(localStorage.getItem('currentUser')).lastName;
  }

  Assessment(){
   
  }

  back(){
    this.router.navigate(['/binmak/ukwazi']);
  }

}
