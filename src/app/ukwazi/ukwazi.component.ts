import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ukwazi',
  templateUrl: './ukwazi.component.html',
  styleUrls: ['./ukwazi.component.scss']
})
export class UkwaziComponent implements OnInit {

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
    this.router.navigate(['/binmak']);
  }
}
