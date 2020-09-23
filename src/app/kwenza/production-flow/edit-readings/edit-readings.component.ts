import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-edit-readings',
  templateUrl: './edit-readings.component.html',
  styleUrls: ['./edit-readings.component.scss']
})
export class EditReadingsComponent implements OnInit {

  reading: any;
  assetReadingsForm: FormGroup;
  loading: boolean;
  date: any;
  assetId: number;
  assetName: any;
  readingId: number;
  reference: string;
  UserId: string;
  userCheckerObject: any;

  constructor(private route: ActivatedRoute, private service: MainServiceService,
    private router: Router) {
  }

  back() {
    this.router.navigate(['/binmak/asset-readings/' + this.assetId]);
  }

  ngOnInit(): void {

    this.loading = false;

    this.route.queryParams.subscribe(params => {
      this.reading = JSON.parse(params["reading"]);
      this.date = JSON.parse(params["reading"]).dateProduction;
      this.readingId = JSON.parse(params["reading"]).readingId;
      this.reference = JSON.parse(params["reading"]).reference;
      this.assetId = JSON.parse(params["reading"]).assetId;

    });

    this.getUserAssetRights();

    this.service.getAssetById(this.assetId)
      .subscribe((resp: any) => {
        this.assetName = resp.assetName;
        this.date = resp.date;
        console.log(resp);
      })

    this.assetReadingsForm = new FormGroup({

      She: new FormControl(0, Validators.required),
      Day1st4HoursEnds: new FormControl(0, Validators.required),
      Night1st4HoursEnds: new FormControl(0, Validators.required),
      EndsDrilled: new FormControl(0, Validators.required),
      EndsBlasted: new FormControl(0, Validators.required),
      UnlashedEnds: new FormControl(0, Validators.required),

      EndsLashed: new FormControl(0, Validators.required),
      TotalCleanedEnds: new FormControl(0, Validators.required),
      LashedPreparedForSupport: new FormControl(0, Validators.required),
      MuckbayTons: new FormControl(0, Validators.required),
      HoistedTons: new FormControl(0, Validators.required),
      UGCrusherBin: new FormControl(0, Validators.required),

      EndsSupported: new FormControl(0, Validators.required),
      SupportedEnds: new FormControl(0, Validators.required),

      EndsPrepared: new FormControl(0, Validators.required),
      PreparedMarkedEnds: new FormControl(0, Validators.required),

      DrillRigs: new FormControl(0, Validators.required),
      LHDs: new FormControl(0, Validators.required),
      DumpTrucks: new FormControl(0, Validators.required),
      Bolters: new FormControl(0, Validators.required),
      Drifters: new FormControl(0, Validators.required)

    });

    this.getReadinObbject();


  }

  getUserAssetRights(){

    const model = {
      AssetId: this.assetId,
      UserId: JSON.parse(localStorage.getItem('currentUser')).userId
    };

    this.service.CheckAssetUser(model)
    .subscribe((resp: any) => {
      console.log(resp);
      this.userCheckerObject = resp;
      this.loading = false;
    }, (error: any) => {
      console.log(error);
      this.loading = false;
    })

  }

  getReadinObbject() {

    const model = {
      ProductionDate: this.date,
      ReadingId: this.readingId
    };

    this.service.getRedingObject(model)
      .subscribe((resp: any) => {

        console.log(resp);

        if (resp != null) {

          this.assetReadingsForm.patchValue({
            She: resp.she,
            Day1st4HoursEnds: resp.day1st4HoursEnds,
            Night1st4HoursEnds: resp.night1st4HoursEnds,
            EndsDrilled: resp.endsDrilled,
            EndsBlasted: resp.endsBlasted,
            UnlashedEnds: resp.unlashedEnds,

            EndsLashed: resp.endsLashed,
            TotalCleanedEnds: resp.totalCleanedEnds,
            LashedPreparedForSupport: resp.lashedPreparedForSupport,
            MuckbayTons: resp.muckbayTons,
            HoistedTons: resp.hoistedTons,
            UGCrusherBin: resp.ugCrusherBin,

            EndsSupported: resp.endsSupported,
            SupportedEnds: resp.supportedEnds,

            EndsPrepared: resp.endsPrepared,
            PreparedMarkedEnds: resp.preparedMarkedEnds,

            DrillRigs: resp.drillRigs,
            LHDs: resp.lhDs,
            DumpTrucks: resp.dumpTrucks,
            Bolters: resp.bolters,
            Drifters: resp.drifters

          })
        }
        else {
          console.log("Return empty object.");
        }


      }, (error: any) => {
        console.log(error);
      })

  }

  EditReadings() {

    const model = {
      She: this.assetReadingsForm.value.She,
      Bolters: this.assetReadingsForm.value.Bolters,
      Day1st4HoursEnds: this.assetReadingsForm.value.Day1st4HoursEnds,
      Drifters: this.assetReadingsForm.value.Drifters,
      DrillRigs: this.assetReadingsForm.value.DrillRigs,
      DumpTrucks: this.assetReadingsForm.value.DumpTrucks,
      EndsBlasted: this.assetReadingsForm.value.EndsBlasted,
      EndsDrilled: this.assetReadingsForm.value.EndsDrilled,
      EndsLashed: this.assetReadingsForm.value.EndsLashed,
      EndsPrepared: this.assetReadingsForm.value.EndsPrepared,
      EndsSupported: this.assetReadingsForm.value.EndsSupported,
      HoistedTons: this.assetReadingsForm.value.HoistedTons,
      LHDs: this.assetReadingsForm.value.LHDs,
      LashedPreparedForSupport: this.assetReadingsForm.value.LashedPreparedForSupport,
      MuckbayTons: this.assetReadingsForm.value.MuckbayTons,
      Night1st4HoursEnds: this.assetReadingsForm.value.Night1st4HoursEnds,
      PreparedMarkedEnds: this.assetReadingsForm.value.PreparedMarkedEnds,
      SupportedEnds: this.assetReadingsForm.value.SupportedEnds,
      TotalCleanedEnds: this.assetReadingsForm.value.TotalCleanedEnds,
      UGCrusherBin: this.assetReadingsForm.value.UGCrusherBin,
      UnlashedEnds: this.assetReadingsForm.value.UnlashedEnds,
      Reference: this.reference,
      ReadingId: this.readingId
    };
    console.log(model);

    this.service.EditAssetReading(model)
      .subscribe((resp: any) => {
        console.log(resp);
        this.router.navigate(['/binmak/asset-readings/' + this.assetId])
      }, (error: any) => {
        console.log(error);
      })

  }

}
