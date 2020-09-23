import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RootComponent } from './root/root.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
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


const routes: Routes = [
  { path: '', redirectTo: 'binmak', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-reset/:email/:token', component: PasswordResetComponent },
  { path: 'binmak',
      component: BinmakLandingComponent,
      children : [
        { path: '', component: RootComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-register', component: AssetRegisterComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-setup', component: AssetSetupComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'manage-access', component: ManagePermissionComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'kwenza', component: KwenzaComponent, pathMatch: 'full', canActivate: [AuthGuard] },
        { path: 'my-assets', component: ProductionFlowComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'asset-readings/:assetNodeId', component: ReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'new-asset-readings/:assetNodeId', component: NewReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'new-readings-editvalue', component: NewReadingsEditvalueComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'overall-production', component: OverallProductionComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'charts/:assetId', component: ChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'parent-charts/:assetId', component: ParentChartsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'limits', component: EditLimitsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'edit-readings', component: EditReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'ukwazi', component: UkwaziComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'ukwazi-assessments', component: AssessmentsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-landing', component: AssessmentLandingComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'assessment-types', component: AssessmentLandingTypeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'prod-config', component: ProdConfigurationComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa', component: KpaComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-limit', component: KpaLimitsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'overall-new-readings/:assetNodeId', component: OverallNewReadingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
        { path: 'kpa-value-config/:keyProcessAreaId', component: KpaValueConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      ]
    },
    {path:'**', redirectTo: 'binmak', pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
