import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService, private toastrService: ToastService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    //Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    //PasswordConfirmation: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {

  
      const model: any = {
        Email: this.form.value.Email,
        Password: this.form.value.Password,
        ForgotPassword: this.form.value.PasswordConfirmation,
      };

      console.log(model);
      this.loading = true;
      this.authenticationService.forgotPassword(model)
        .subscribe(
          (data: any) => {
            this.loading = false;
            console.log(data);
            this.toastrService.success('Check Your Email, To Reset Your Password.');
            this.form.reset();
          },
          (error: any) => {
            console.log(error);
            this.toastrService.error(error.error);
            this.loading = false;
          });
    

  }

}
