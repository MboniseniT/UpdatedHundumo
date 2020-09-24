import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-kpa-value-config',
  templateUrl: './kpa-value-config.component.html',
  styleUrls: ['./kpa-value-config.component.scss']
})
export class KpaValueConfigComponent implements OnInit {

  dynamicFormular: string = 'Under Construction!!!';
  
  keyProcessAreaId: number;

  constructor(private route: ActivatedRoute, private service: MainServiceService, 
    private router: Router) { 
  }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      this.keyProcessAreaId = +params.keyProcessAreaId;
      console.log(this.keyProcessAreaId);
    });

    this.service.GetClientAssetKPAs(this.keyProcessAreaId)
    .subscribe((resp: any) =>{
      console.log(resp);
    }, (error: any) =>{
      console.log(error.error);
    })

  }

}
