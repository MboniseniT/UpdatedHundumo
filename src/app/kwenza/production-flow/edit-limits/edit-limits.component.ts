import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-edit-limits',
  templateUrl: './edit-limits.component.html',
  styleUrls: ['./edit-limits.component.scss']
})
export class EditLimitsComponent implements OnInit {

  assetId: number;
  date: Date;
  assetLimitForm: FormGroup;
  assetName: string;
  loading: boolean;

  constructor(private route: ActivatedRoute, private service: MainServiceService, 
    private router: Router) { 
  }

  ngOnInit(): void {

    debugger;

    this.route.queryParams.subscribe(params => {
      this.date = JSON.parse(params["model"]).ProductionDate;
      this.assetId = JSON.parse(params["model"]).AssetId;
    });

    this.service.getAssetById(this.assetId)
    .subscribe((resp:any)=>{
      this.assetName = resp.assetName;
      console.log(resp);
    })

    this.assetLimitForm = new FormGroup({
      SheMonthTarget: new FormControl(0, Validators.required),
      Day1st4HoursEndsMonthTarget: new FormControl(0, Validators.required),
      Night1st4HoursEndsMonthTarget: new FormControl(0, Validators.required),
      EndsDrilledMonthTarget: new FormControl(0, Validators.required),
      EndsBlastedMonthTarget: new FormControl(0, Validators.required),
      UnlashedEndsMonthTarget: new FormControl(0, Validators.required),

      EndsLashedMonthTarget: new FormControl(0, Validators.required),
      TotalCleanedEndsMonthTarget: new FormControl(0, Validators.required),
      LashedPreparedForSupportMonthTarget: new FormControl(0, Validators.required),
      MuckbayTonsMonthTarget: new FormControl(0, Validators.required),
      HoistedTonsMonthTarget: new FormControl(0, Validators.required),
      UGCrusherBinMonthTarget: new FormControl(0, Validators.required),

      EndsSupportedMonthTarget: new FormControl(0, Validators.required),
      SupportedEndsMonthTarget: new FormControl(0, Validators.required),

      EndsPreparedMonthTarget: new FormControl(0, Validators.required),
      PreparedMarkedEndsMonthTarget: new FormControl(0, Validators.required),

      DrillRigsMonthTarget: new FormControl(0, Validators.required),
      LHDsMonthTarget: new FormControl(0, Validators.required),
      DumpTrucksMonthTarget: new FormControl(0, Validators.required),
      BoltersMonthTarget: new FormControl(0, Validators.required),
      DriftersMonthTarget: new FormControl(0, Validators.required),


      SheTarget: new FormControl(0, Validators.required),
      Day1st4HoursEndsTarget: new FormControl(0, Validators.required),
      Night1st4HoursEndsTarget: new FormControl(0, Validators.required),
      EndsDrilledTarget: new FormControl(0, Validators.required),
      EndsBlastedTarget: new FormControl(0, Validators.required),
      UnlashedEndsTarget: new FormControl(0, Validators.required),

      EndsLashedTarget: new FormControl(0, Validators.required),
      TotalCleanedEndsTarget: new FormControl(0, Validators.required),
      LashedPreparedForSupportTarget: new FormControl(0, Validators.required),
      MuckbayTonsTarget: new FormControl(0, Validators.required),
      HoistedTonsTarget: new FormControl(0, Validators.required),
      UGCrusherBinTarget: new FormControl(0, Validators.required),

      EndsSupportedTarget: new FormControl(0, Validators.required),
      SupportedEndsTarget: new FormControl(0, Validators.required),

      EndsPreparedTarget: new FormControl(0, Validators.required),
      PreparedMarkedEndsTarget: new FormControl(0, Validators.required),

      DrillRigsTarget: new FormControl(0, Validators.required),
      LHDsTarget: new FormControl(0, Validators.required),
      DumpTrucksTarget: new FormControl(0, Validators.required),
      BoltersTarget: new FormControl(0, Validators.required),
      DriftersTarget: new FormControl(0, Validators.required),


      SheBudget: new FormControl(0, Validators.required),
      Day1st4HoursEndsBudget: new FormControl(0, Validators.required),
      Night1st4HoursEndsBudget: new FormControl(0, Validators.required),
      EndsDrilledBudget: new FormControl(0, Validators.required),
      EndsBlastedBudget: new FormControl(0, Validators.required),
      UnlashedEndsBudget: new FormControl(0, Validators.required),

      EndsLashedBudget: new FormControl(0, Validators.required),
      TotalCleanedEndsBudget: new FormControl(0, Validators.required),
      LashedPreparedForSupportBudget: new FormControl(0, Validators.required),
      MuckbayTonsBudget: new FormControl(0, Validators.required),
      HoistedTonsBudget: new FormControl(0, Validators.required),
      UGCrusherBinBudget: new FormControl(0, Validators.required),

      EndsSupportedBudget: new FormControl(0, Validators.required),
      SupportedEndsBudget: new FormControl(0, Validators.required),

      EndsPreparedBudget: new FormControl(0, Validators.required),
      PreparedMarkedEndsBudget: new FormControl(0, Validators.required),

      DrillRigsBudget: new FormControl(0, Validators.required),
      LHDsBudget: new FormControl(0, Validators.required),
      DumpTrucksBudget: new FormControl(0, Validators.required),
      BoltersBudget: new FormControl(0, Validators.required),
      DriftersBudget: new FormControl(0, Validators.required),


      SheThreshold: new FormControl(0, Validators.required),
      Day1st4HoursEndsThreshold: new FormControl(0, Validators.required),
      Night1st4HoursEndsThreshold: new FormControl(0, Validators.required),
      EndsDrilledThreshold: new FormControl(0, Validators.required),
      EndsBlastedThreshold: new FormControl(0, Validators.required),
      UnlashedEndsThreshold: new FormControl(0, Validators.required),

      EndsLashedThreshold: new FormControl(0, Validators.required),
      TotalCleanedEndsThreshold: new FormControl(0, Validators.required),
      LashedPreparedForSupportThreshold: new FormControl(0, Validators.required),
      MuckbayTonsThreshold: new FormControl(0, Validators.required),
      HoistedTonsThreshold: new FormControl(0, Validators.required),
      UGCrusherBinThreshold: new FormControl(0, Validators.required),

      EndsSupportedThreshold: new FormControl(0, Validators.required),
      SupportedEndsThreshold: new FormControl(0, Validators.required),

      EndsPreparedThreshold: new FormControl(0, Validators.required),
      PreparedMarkedEndsThreshold: new FormControl(0, Validators.required),

      DrillRigsThreshold: new FormControl(0, Validators.required),
      LHDsThreshold: new FormControl(0, Validators.required),
      DumpTrucksThreshold: new FormControl(0, Validators.required),
      BoltersThreshold: new FormControl(0, Validators.required),
      DriftersThreshold: new FormControl(0, Validators.required),

    });

    this.getLimitObject();

  }

  back(){
    this.router.navigate(['/binmak/asset-readings/'+this.assetId]);
  }

  EditLimit(){
   
    const model ={
      SheMonthTarget: this.assetLimitForm.value.SheMonthTarget,
      BoltersMonthTarget: this.assetLimitForm.value.BoltersMonthTarget,
      Day1st4HoursEndsMonthTarget: this.assetLimitForm.value.Day1st4HoursEndsMonthTarget,
      DriftersMonthTarget: this.assetLimitForm.value.DriftersMonthTarget,
      DrillRigsMonthTarget: this.assetLimitForm.value.DrillRigsMonthTarget,
      DumpTrucksMonthTarget: this.assetLimitForm.value.DumpTrucksMonthTarget,
      EndsBlastedMonthTarget: this.assetLimitForm.value.EndsBlastedMonthTarget,
      EndsDrilledMonthTarget: this.assetLimitForm.value.EndsDrilledMonthTarget,
      EndsLashedMonthTarget: this.assetLimitForm.value.EndsLashedMonthTarget,
      EndsPreparedMonthTarget: this.assetLimitForm.value.EndsPreparedMonthTarget,
      EndsSupportedMonthTarget: this.assetLimitForm.value.EndsSupportedMonthTarget,
      HoistedTonsMonthTarget: this.assetLimitForm.value.HoistedTonsMonthTarget,
      LHDsMonthTarget: this.assetLimitForm.value.LHDsMonthTarget,
      LashedPreparedForSupportMonthTarget: this.assetLimitForm.value.LashedPreparedForSupportMonthTarget,
      MuckbayTonsMonthTarget: this.assetLimitForm.value.MuckbayTonsMonthTarget,
      Night1st4HoursEndsMonthTarget: this.assetLimitForm.value.Night1st4HoursEndsMonthTarget,
      PreparedMarkedEndsMonthTarget: this.assetLimitForm.value.PreparedMarkedEndsMonthTarget,
      SupportedEndsMonthTarget: this.assetLimitForm.value.SupportedEndsMonthTarget,
      TotalCleanedEndsMonthTarget: this.assetLimitForm.value.TotalCleanedEndsMonthTarget,
      UGCrusherBinMonthTarget: this.assetLimitForm.value.UGCrusherBinMonthTarget,
      UnlashedEndsMonthTarget: this.assetLimitForm.value.UnlashedEndsMonthTarget,

      SheTarget: this.assetLimitForm.value.SheTarget,
      BoltersTarget: this.assetLimitForm.value.BoltersTarget,
      Day1st4HoursEndsTarget: this.assetLimitForm.value.Day1st4HoursEndsTarget,
      DriftersTarget: this.assetLimitForm.value.DriftersTarget,
      DrillRigsTarget: this.assetLimitForm.value.DrillRigsTarget,
      DumpTrucksTarget: this.assetLimitForm.value.DumpTrucksTarget,
      EndsBlastedTarget: this.assetLimitForm.value.EndsBlastedTarget,
      EndsDrilledTarget: this.assetLimitForm.value.EndsDrilledTarget,
      EndsLashedTarget: this.assetLimitForm.value.EndsLashedTarget,
      EndsPreparedTarget: this.assetLimitForm.value.EndsPreparedTarget,
      EndsSupportedTarget: this.assetLimitForm.value.EndsSupportedTarget,
      HoistedTonsTarget: this.assetLimitForm.value.HoistedTonsTarget,
      LHDsTarget: this.assetLimitForm.value.LHDsTarget,
      LashedPreparedForSupportTarget: this.assetLimitForm.value.LashedPreparedForSupportTarget,
      MuckbayTonsTarget: this.assetLimitForm.value.MuckbayTonsTarget,
      Night1st4HoursEndsTarget: this.assetLimitForm.value.Night1st4HoursEndsTarget,
      PreparedMarkedEndsTarget: this.assetLimitForm.value.PreparedMarkedEndsTarget,
      SupportedEndsTarget: this.assetLimitForm.value.SupportedEndsTarget,
      TotalCleanedEndsTarget: this.assetLimitForm.value.TotalCleanedEndsTarget,
      UGCrusherBinTarget: this.assetLimitForm.value.UGCrusherBinTarget,
      UnlashedEndsTarget: this.assetLimitForm.value.UnlashedEndsTarget,

      SheBudget: this.assetLimitForm.value.SheBudget,
      BoltersBudget: this.assetLimitForm.value.BoltersBudget,
      Day1st4HoursEndsBudget: this.assetLimitForm.value.Day1st4HoursEndsBudget,
      DriftersBudget: this.assetLimitForm.value.DriftersBudget,
      DrillRigsBudget: this.assetLimitForm.value.DrillRigsBudget,
      DumpTrucksBudget: this.assetLimitForm.value.DumpTrucksBudget,
      EndsBlastedBudget: this.assetLimitForm.value.EndsBlastedBudget,
      EndsDrilledBudget: this.assetLimitForm.value.EndsDrilledBudget,
      EndsLashedBudget: this.assetLimitForm.value.EndsLashedBudget,
      EndsPreparedBudget: this.assetLimitForm.value.EndsPreparedBudget,
      EndsSupportedBudget: this.assetLimitForm.value.EndsSupportedBudget,
      HoistedTonsBudget: this.assetLimitForm.value.HoistedTonsBudget,
      LHDsBudget: this.assetLimitForm.value.LHDsBudget,
      LashedPreparedForSupportBudget: this.assetLimitForm.value.LashedPreparedForSupportBudget,
      MuckbayTonsBudget: this.assetLimitForm.value.MuckbayTonsBudget,
      Night1st4HoursEndsBudget: this.assetLimitForm.value.Night1st4HoursEndsBudget,
      PreparedMarkedEndsBudget: this.assetLimitForm.value.PreparedMarkedEndsBudget,
      SupportedEndsBudget: this.assetLimitForm.value.SupportedEndsBudget,
      TotalCleanedEndsBudget: this.assetLimitForm.value.TotalCleanedEndsBudget,
      UGCrusherBinBudget: this.assetLimitForm.value.UGCrusherBinBudget,
      UnlashedEndsBudget: this.assetLimitForm.value.UnlashedEndsBudget,

      SheThreshold: this.assetLimitForm.value.SheThreshold,
      BoltersThreshold: this.assetLimitForm.value.BoltersThreshold,
      Day1st4HoursEndsThreshold: this.assetLimitForm.value.Day1st4HoursEndsThreshold,
      DriftersThreshold: this.assetLimitForm.value.DriftersThreshold,
      DrillRigsThreshold: this.assetLimitForm.value.DrillRigsThreshold,
      DumpTrucksThreshold: this.assetLimitForm.value.DumpTrucksThreshold,
      EndsBlastedThreshold: this.assetLimitForm.value.EndsBlastedThreshold,
      EndsDrilledThreshold: this.assetLimitForm.value.EndsDrilledThreshold,
      EndsLashedThreshold: this.assetLimitForm.value.EndsLashedThreshold,
      EndsPreparedThreshold: this.assetLimitForm.value.EndsPreparedThreshold,
      EndsSupportedThreshold: this.assetLimitForm.value.EndsSupportedThreshold,
      HoistedTonsThreshold: this.assetLimitForm.value.HoistedTonsThreshold,
      LHDsThreshold: this.assetLimitForm.value.LHDsThreshold,
      LashedPreparedForSupportThreshold: this.assetLimitForm.value.LashedPreparedForSupportThreshold,
      MuckbayTonsThreshold: this.assetLimitForm.value.MuckbayTonsThreshold,
      Night1st4HoursEndsThreshold: this.assetLimitForm.value.Night1st4HoursEndsThreshold,
      PreparedMarkedEndsThreshold: this.assetLimitForm.value.PreparedMarkedEndsThreshold,
      SupportedEndsThreshold: this.assetLimitForm.value.SupportedEndsThreshold,
      TotalCleanedEndsThreshold: this.assetLimitForm.value.TotalCleanedEndsThreshold,
      UGCrusherBinThreshold: this.assetLimitForm.value.UGCrusherBinThreshold,
      UnlashedEndsThreshold: this.assetLimitForm.value.UnlashedEndsThreshold,

      DateProduction: this.date,
      AssetId: this.assetId
    };

    this.service.EditAssetMonthlyLimit(model)
    .subscribe((resp: any)=>{
      console.log(resp);
      this.router.navigate(['/binmak/asset-readings/'+this.assetId])
    }, (error:any)=>{
      console.log(error);
    });

  }

  getLimitObject() {


    const model = {
      ProductionDate: this.date,
      AssetId: this.assetId
    };

    this.service.getLimitsObject(model)
      .subscribe((resp: any) => {

        console.log(resp);

        if (resp != null) {

          this.assetLimitForm.patchValue({

            SheMonthTarget: resp.sheMonthTarget,
            Day1st4HoursEndsMonthTarget: resp.day1st4HoursEndsMonthTarget,
            Night1st4HoursEndsMonthTarget: resp.night1st4HoursEndsMonthTarget,
            EndsDrilledMonthTarget: resp.endsDrilledMonthTarget,
            EndsBlastedMonthTarget: resp.endsBlastedMonthTarget,
            UnlashedEndsMonthTarget: resp.unlashedEndsMonthTarget,

            EndsLashedMonthTarget: resp.endsLashedMonthTarget,
            TotalCleanedEndsMonthTarget: resp.totalCleanedEndsMonthTarget,
            LashedPreparedForSupportMonthTarget: resp.lashedPreparedForSupportMonthTarget,
            MuckbayTonsMonthTarget: resp.muckbayTonsMonthTarget,
            HoistedTonsMonthTarget: resp.hoistedTonsMonthTarget,
            UGCrusherBinMonthTarget: resp.ugCrusherBinMonthTarget,

            EndsSupportedMonthTarget: resp.endsSupportedMonthTarget,
            SupportedEndsMonthTarget: resp.supportedEndsMonthTarget,

            EndsPreparedMonthTarget: resp.endsPreparedMonthTarget,
            PreparedMarkedEndsMonthTarget: resp.preparedMarkedEndsMonthTarget,

            DrillRigsMonthTarget: resp.drillRigsMonthTarget,
            LHDsMonthTarget: resp.lhDsMonthTarget,
            DumpTrucksMonthTarget: resp.dumpTrucksMonthTarget,
            BoltersMonthTarget: resp.boltersMonthTarget,
            DriftersMonthTarget: resp.driftersMonthTarget,


            SheTarget: resp.sheTarget,
            Day1st4HoursEndsTarget: resp.day1st4HoursEndsTarget,
            Night1st4HoursEndsTarget: resp.night1st4HoursEndsTarget,
            EndsDrilledTarget: resp.endsDrilledTarget,
            EndsBlastedTarget: resp.endsBlastedTarget,
            UnlashedEndsTarget: resp.unlashedEndsTarget,

            EndsLashedTarget: resp.endsLashedTarget,
            TotalCleanedEndsTarget: resp.totalCleanedEndsTarget,
            LashedPreparedForSupportTarget: resp.lashedPreparedForSupportTarget,
            MuckbayTonsTarget: resp.muckbayTonsTarget,
            HoistedTonsTarget: resp.hoistedTonsTarget,
            UGCrusherBinTarget: resp.ugCrusherBinTarget,

            EndsSupportedTarget: resp.endsSupportedTarget,
            SupportedEndsTarget: resp.supportedEndsTarget,

            EndsPreparedTarget: resp.endsPreparedTarget,
            PreparedMarkedEndsTarget: resp.preparedMarkedEndsTarget,

            DrillRigsTarget: resp.drillRigsTarget,
            LHDsTarget: resp.lhDsTarget,
            DumpTrucksTarget: resp.dumpTrucksTarget,
            BoltersTarget: resp.boltersTarget,
            DriftersTarget: resp.driftersTarget,



            SheBudget: resp.sheBudget,
            Day1st4HoursEndsBudget: resp.day1st4HoursEndsBudget,
            Night1st4HoursEndsBudget: resp.night1st4HoursEndsBudget,
            EndsDrilledBudget: resp.endsDrilledBudget,
            EndsBlastedBudget: resp.endsBlastedBudget,
            UnlashedEndsBudget: resp.unlashedEndsBudget,

            EndsLashedBudget: resp.endsLashedBudget,
            TotalCleanedEndsBudget: resp.totalCleanedEndsBudget,
            LashedPreparedForSupportBudget: resp.lashedPreparedForSupportBudget,
            MuckbayTonsBudget: resp.muckbayTonsBudget,
            HoistedTonsBudget: resp.hoistedTonsBudget,
            UGCrusherBinBudget: resp.ugCrusherBinBudget,

            EndsSupportedBudget: resp.endsSupportedBudget,
            SupportedEndsBudget: resp.supportedEndsBudget,

            EndsPreparedBudget: resp.endsPreparedBudget,
            PreparedMarkedEndsBudget: resp.preparedMarkedEndsBudget,

            DrillRigsBudget: resp.drillRigsBudget,
            LHDsBudget: resp.lhDsBudget,
            DumpTrucksBudget: resp.dumpTrucksBudget,
            BoltersBudget: resp.boltersBudget,
            DriftersBudget: resp.driftersBudget,



            SheThreshold: resp.sheThreshold,
            Day1st4HoursEndsThreshold: resp.day1st4HoursEndsThreshold,
            Night1st4HoursEndsThreshold: resp.night1st4HoursEndsThreshold,
            EndsDrilledThreshold: resp.endsDrilledThreshold,
            EndsBlastedThreshold: resp.endsBlastedThreshold,
            UnlashedEndsThreshold: resp.unlashedEndsThreshold,

            EndsLashedThreshold: resp.endsLashedThreshold,
            TotalCleanedEndsThreshold: resp.totalCleanedEndsThreshold,
            LashedPreparedForSupportThreshold: resp.lashedPreparedForSupportThreshold,
            MuckbayTonsThreshold: resp.muckbayTonsThreshold,
            HoistedTonsThreshold: resp.hoistedTonsThreshold,
            UGCrusherBinThreshold: resp.ugCrusherBinThreshold,

            EndsSupportedThreshold: resp.endsSupportedThreshold,
            SupportedEndsThreshold: resp.supportedEndsThreshold,

            EndsPreparedThreshold: resp.endsPreparedThreshold,
            PreparedMarkedEndsThreshold: resp.preparedMarkedEndsThreshold,

            DrillRigsThreshold: resp.drillRigsThreshold,
            LHDsThreshold: resp.lhDsThreshold,
            DumpTrucksThreshold: resp.dumpTrucksThreshold,
            BoltersThreshold: resp.boltersThreshold,
            DriftersThreshold: resp.driftersThreshold,


          })
        }
        else {
          console.log("Return empty object.");
        }


      }, (error: any) => {
        console.log(error);
      })
    }

}
