import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  registerForm: FormGroup;
  countries: Array<any>;

  constructor( private route: ActivatedRoute, private http: HttpClient, 
                private router: Router, private formBuilder: FormBuilder,
                private service: MainServiceService, private authService: AuthenticationService, 
                private toastrService: ToastService) { }

  ngOnInit() {
    this.authService.getCountries()
    .subscribe(resp=>{
      this.countries = resp.map((t: any) =>{
        return {label: t.countryCode+' '+t.countryName, value: t.countryId}
      })
    })
  }

  form = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    LastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    CompanyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Country: new FormControl(0, [Validators.required, Validators.minLength(2)]),
    Address: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Address2: new FormControl('', [Validators.required, Validators.minLength(2)]),
    City: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Zip: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  get f() {
    return this.form.controls;
  }

  login(){
    this.router.navigate(['/login']);
  }

  register(){
    this.loading = true;

    const model = {
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName,
      Password: this.form.value.Password,
      ConfirmPassword: this.form.value.ConfirmPassword,
      Email: this.form.value.Email,
      CountryId: this.form.value.Country,
      CompanyName: this.form.value.CompanyName,
      Address: this.form.value.Address,
      Address2: this.form.value.Address2,
      City: this.form.value.City,
      Zip: this.form.value.Zip,
    };

    if(this.form.value.Password == this.form.value.ConfirmPassword)
      {
        this.authService.registerBinMakUser(model)
        .subscribe((resp: any)=>{
          this.toastrService.success('Registered successfully, please login');
          this.loading = false;
          this.form.reset();
        }, (error:any)=>{
          this.loading = false;
          this.toastrService.error(error.error);
        })
      }
      else{
        this.loading = false;
        this.toastrService.error('Password and Confirm Passowrd do not match, Try again!');
      }
  }

}
