import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;

  constructor( private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
               private authenticationService: AuthenticationService, private toastrService: ToastService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  form = new FormGroup({
    Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.form.controls;
  }

  register(){
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  login() {

      this.loading = true;
      this.authenticationService.login( this.form.value.Email, this.form.value.Password )
          .subscribe(
              (data: any) => {
                  this.loading = false;
                  console.log(data);
                  this.router.navigate(['binmak']);
              },
              (error: any) => {
                  console.log(error);
                  this.toastrService.error(error.error);
                  this.loading = false;
              });
  }

}
