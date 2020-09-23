import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModulesPro, ToastModule, SelectModule, MDBModalService, MDB_DATE_OPTIONS } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationService } from './services/authentication.service';
import { MainServiceService } from './services/main-service.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { BinmakLandingComponent } from './binmak-landing/binmak-landing.component';
import { AssetRegisterComponent } from './asset-management/asset-register/asset-register.component';
import { RootComponent } from './root/root.component';
import { AssetSetupComponent } from './asset-management/asset-register/asset-setup/asset-setup.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { UsersComponent } from './account/users/users.component';
import { ManagePermissionComponent } from './account/manage-permission/manage-permission.component';
import { PasswordResetComponent } from './account/password-reset/password-reset.component';
import { KwenzaComponent } from './kwenza/kwenza.component';
import { ProductionFlowComponent } from './kwenza/production-flow/production-flow.component';
import { ReadingsComponent } from './kwenza/production-flow/readings/readings.component';
import { OverallProductionComponent } from './kwenza/production-flow/overall-production/overall-production.component';
import { ChartsComponent } from './kwenza/production-flow/charts/charts.component';
import { EditLimitsComponent } from './kwenza/production-flow/edit-limits/edit-limits.component';
import { EditReadingsComponent } from './kwenza/production-flow/edit-readings/edit-readings.component';
import { UkwaziComponent } from './ukwazi/ukwazi.component';
import { AssessmentsComponent } from './ukwazi/assessments/assessments.component';
import { AssessmentLandingComponent } from './ukwazi/assessment-landing/assessment-landing.component';
import { AssessmentLandingTypeComponent } from './ukwazi/assessment-landing-type/assessment-landing-type.component';
import { ParentChartsComponent } from './kwenza/production-flow/parent-charts/parent-charts.component';
import { ProdConfigurationComponent } from './kwenza/production-flow/prod-configuration/prod-configuration.component';
import { KpaComponent } from './kwenza/production-flow/kpa/kpa.component';
import { KpaLimitsComponent } from './kwenza/production-flow/kpa-limits/kpa-limits.component';
import { NewReadingsComponent } from './kwenza/production-flow/new-readings/new-readings.component';
import { NewReadingsEditvalueComponent } from './kwenza/production-flow/new-readings-editvalue/new-readings-editvalue.component';
import { OverallNewReadingsComponent } from './kwenza/production-flow/overall-new-readings/overall-new-readings.component';
import { KpaValueConfigComponent } from './kwenza/production-flow/kpa/kpa-value-config/kpa-value-config.component';
//import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BinmakLandingComponent,
    AssetRegisterComponent,
    RootComponent,
    AssetSetupComponent,
    ForgotPasswordComponent,
    UsersComponent,
    ManagePermissionComponent,
    PasswordResetComponent,
    KwenzaComponent,
    ProductionFlowComponent,
    ReadingsComponent,
    OverallProductionComponent,
    ChartsComponent,
    EditLimitsComponent,
    EditReadingsComponent,
    UkwaziComponent,
    AssessmentsComponent,
    AssessmentLandingComponent,
    AssessmentLandingTypeComponent,
    ParentChartsComponent,
    ProdConfigurationComponent,
    KpaComponent,
    KpaLimitsComponent,
    NewReadingsComponent,
    NewReadingsEditvalueComponent,
    OverallNewReadingsComponent,
    KpaValueConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    //ChartModule,
    DataTablesModule,
    ReactiveFormsModule,
    SelectModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [MDBModalService, AuthGuard,DatePipe, 
    AuthenticationService,
    { provide: MDB_DATE_OPTIONS, useValue: { showTodayBtn: false } },
    MainServiceService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
