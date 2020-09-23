import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-overall-production',
  templateUrl: './overall-production.component.html',
  styleUrls: ['./overall-production.component.scss']
})
export class OverallProductionComponent implements OnInit {

  assetId: number;
  FunctionUnits: any;
  loading: boolean;
  date: any;

  constructor(private service: MainServiceService, private router: ActivatedRoute, private toastrService: ToastService, private route: Router) { }

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.date = JSON.parse(params["model"]).ProductionDate;
      this.assetId = JSON.parse(params["model"]).AssetId;

    this.loading = true;

    const model = {
      AssetId: JSON.parse(params["model"]).AssetId,
      ProductionDate: JSON.parse(params["model"]).ProductionDate
    }

    this.service.getAssetOverallProduction(model)
    .subscribe((resp:any) =>{
      this.FunctionUnits = resp;
      console.log(resp);
      this.loading = false;
    }, (error: any)=>{
      console.log(error);
      this.toastrService.error(error.error);
      this.loading = false;
    })
  
  });
  }

  back(){
    this.route.navigate(['/binmak/asset-readings/'+this.assetId]);
  }

}
