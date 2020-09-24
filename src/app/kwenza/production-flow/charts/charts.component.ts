import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  chartForm: FormGroup;
  assetId: number;
  loading: boolean;
  index: number;

  masterCharts: Array<MasterChart>;
  masterChart: MasterChart;
  controlLimit: ControlLimit;
  controlLimits: Array<ControlLimit>;
  ChartNames: Array<ChartNameObject> = [];

  lCharts: Array<any> = [];
  

  public optionsWhiskerBox1: any = {
  }
  public optionsWhiskerBox2: any = {
}
public optionsWhiskerBox3: any = {
}
public optionsWhiskerBox4: any = {
}
public optionsWhiskerBox5: any = {
}

public optionsHistogram1: any = {};
public optionsHistogram2: any = {};
public optionsHistogram3: any = {};
public optionsHistogram4: any = {};
public optionsHistogram5: any = {};
  public optionsLine: any = { };
  public optionsLine2: any = { };
  public optionsLine3: any = { };
  public optionsLine4: any = { };
  public optionsLine5: any = { };
  public optionsLine6: any = { };
  public optionsLine7: any = { };
  public optionsLine8: any = { };
  data1: Array<any> = [];
  data2: Array<any> = [];
  data3: Array<any> = [];
  data4: Array<any> = [];
  data5: Array<any> = [];
  codeName: string;
  asset: any;
  chartNames: Array<string> = [];

  constructor(private service: MainServiceService,
    private route: ActivatedRoute, private router: Router, 
    private toastrService: ToastService) { }

  ngOnInit(): void {

   this.loading = false;

    this.route.params.subscribe(params => {
      this.assetId = +params['assetId'];       
      console.log(this.assetId);
    });

    this.service.getChartAssetByAssetId(this.assetId)
    .subscribe((resp:any)=>{
      this.asset = resp;
      this.codeName = resp.code + " "+ resp.name;
      console.log(resp);
    }, (error: any) =>{
      console.log(error);
    })


    this.chartForm = new FormGroup({

      StartDate: new FormControl('', Validators.required),
      EndDate: new FormControl('', Validators.required),
    })
  }

dates: Array<string>;

  LoadChart(){

    this.loading = true;

    const model ={
      StartDate: this.chartForm.value.StartDate,
      EndDate: this.chartForm.value.EndDate,
      AssetId: this.assetId
    }

    if(model.StartDate != '' && model.EndDate != '' && model.EndDate > model.StartDate){
    this.service.DrawChart(model)
    .subscribe((resp:any)=>{

      this.masterCharts = resp;
   

      for (let value of this.masterCharts) {

        this.chartNames = ['TotalHoistedTons', 'EndsDrilled', 'ROMTonsCrushed']

        this.loading = false;

        let chart = {
          chart: {
              type: 'spline'
          },
          title: {
              text: value.kpaName
          },
          subtitle: {
              text: 'Dates'+ value.startDate+'-'+value.endDate
          },
          xAxis: {
              categories: value.controlLimit.dates
          },
      
          tooltip: {
              crosshairs: true,
              shared: true
          },
          plotOptions: {
              spline: {
                  marker: {
                      radius: 4,
                      lineColor: '#666666',
                      lineWidth: 1
                  }
              }
          },
          series: [{
      
              data: value.controlLimit.measurements
      
          }]
      }


        this.lCharts.push({name: value.kpaName, objectChart: chart});
    }

    debugger;

    console.log(this.lCharts);


    for (let c of this.lCharts) {
      
      const name = c.name.replaceAll(' ', '');
      Highcharts.chart('TotalHoistedTons', c.objectChart);

    }



      /*this.lineChart = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Daily Ends Drilled Control Chart"
       },
       subtitle: {
          text: "Test"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Daily Ends Drilled"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: ucl,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Daily Ends Drilled',
          data: measurements,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lcl,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }/*

      /*let measurements = resp.LineEndsDrilled.map(a => a.mesuarement);
      let lcl = resp.LineEndsDrilled.map(a => a.lcl);
      let ucl = resp.LineEndsDrilled.map(a => a.ucl);
      let date = resp.LineEndsDrilled.map(a => a.date);
      let mean = resp.LineEndsDrilled.map(a => a.mean);

      let measurementsF4 = resp.First4Hours.map(a => a.mesuarement);
      let lclF4 = resp.First4Hours.map(a => a.lcl);
      let uclF4 = resp.First4Hours.map(a => a.ucl);
      let dateF4 = resp.First4Hours.map(a => a.date);
      let meanF4 = resp.First4Hours.map(a => a.mean);

      let measurementsSuppoertedEnds = resp.DailySupportedEnds.map(a => a.mesuarement);
      let lclSuppoertedEnds = resp.DailySupportedEnds.map(a => a.lcl);
      let uclSuppoertedEnds = resp.DailySupportedEnds.map(a => a.ucl);
      let dateSuppoertedEnds = resp.DailySupportedEnds.map(a => a.date);
      let meanSuppoertedEnds = resp.DailySupportedEnds.map(a => a.mean);


      let measurementsSupportedEnds = resp.SupportedEnds.map(a => a.mesuarement);
      let lclSupportedEnds = resp.SupportedEnds.map(a => a.lcl);
      let uclSupportedEnds = resp.SupportedEnds.map(a => a.ucl);
      let dateSupportedEnds = resp.SupportedEnds.map(a => a.date);
      let meanSupportedEnds = resp.SupportedEnds.map(a => a.mean);

      let measurementsUnlashedEnds = resp.UnlashedEnds.map(a => a.mesuarement);
      let lclUnlashedEnds = resp.UnlashedEnds.map(a => a.lcl);
      let uclUnlashedEnds = resp.UnlashedEnds.map(a => a.ucl);
      let dateUnlashedEnds = resp.UnlashedEnds.map(a => a.date);
      let meanUnlashedEnds = resp.UnlashedEnds.map(a => a.mean);

      let measurementsHoistedTons = resp.HoistedTons.map(a => a.mesuarement);
      let lclHoistedTons = resp.HoistedTons.map(a => a.lcl);
      let uclHoistedTons = resp.HoistedTons.map(a => a.ucl);
      let dateHoistedTons = resp.HoistedTons.map(a => a.date);
      let meanHoistedTons = resp.HoistedTons.map(a => a.mean);

      let measurementsCleanedEnds = resp.CleanedEnds.map(a => a.mesuarement);
      let lclCleanedEnds = resp.CleanedEnds.map(a => a.lcl);
      let uclCleanedEnds = resp.CleanedEnds.map(a => a.ucl);
      let dateCleanedEnds = resp.CleanedEnds.map(a => a.date);
      let meanCleanedEnds = resp.CleanedEnds.map(a => a.mean);

      let measurementsLashedPreparedEnds = resp.LashedPreparedEnds.map(a => a.mesuarement);
      let lclLashedPreparedEnds = resp.LashedPreparedEnds.map(a => a.lcl);
      let uclLashedPreparedEnds = resp.LashedPreparedEnds.map(a => a.ucl);
      let dateLashedPreparedEnds = resp.LashedPreparedEnds.map(a => a.date);
      let meanLashedPreparedEnds = resp.LashedPreparedEnds.map(a => a.mean);
      

      console.log(resp.EndsDrilledPlotBox);
      let EndsDrilledBP = resp.EndsDrilledPlotBox;//.map(a => a.plotBoxValues);

      console.log(resp.First4EndsDrilledPlotBox);
      let EndsDrilledBP2 = resp.First4EndsDrilledPlotBox;

      console.log(resp.EndsSupportedPlotBox);
      let EndsDrilledBP3 = resp.EndsSupportedPlotBox;//.map(a => a.plotBoxValues);

      console.log(resp.SupportedEndsPlotBox);
      let EndsDrilledBP4 = resp.SupportedEndsPlotBox;

      console.log(resp.HoistedTonsPlotBox);
      let EndsDrilledBP5 = resp.HoistedTonsPlotBox;


      let EndsDrilledH1 = resp.Histogram1;
      let EndsDrilledH2 = resp.Histogram2;
      let EndsDrilledH3 = resp.Histogram3;
      let EndsDrilledH4 = resp.Histogram4;
      let EndsDrilledH5 = resp.Histogram5;


      this.optionsHistogram1 = {
        chart: {
          type: 'column'
        },
        title: {
          text: EndsDrilledH1.name
        },
        subtitle: {
          text: "Mean: " + resp.Histogram1.mean+", Maximum: "+resp.Histogram1.histogramValues.maximum+", Minimum: "+resp.Histogram1.histogramValues.minimum+", Data Points: "+resp.Histogram1.numberOfValues+", (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
        xAxis: {
          categories: EndsDrilledH1.xAxis,
          crosshair: true,
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        credits: {
          enabled: false
        },
        source: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          data: EndsDrilledH1.yAxis
        }]


      }

      this.optionsHistogram2 = {
        chart: {
          type: 'column'
        },
        title: {
          text: EndsDrilledH2.name
        },
        subtitle: {
          text: "Mean: " + resp.Histogram2.mean+", Maximum: "+resp.Histogram2.histogramValues.maximum+", Minimum: "+resp.Histogram2.histogramValues.minimum+", Data Points: "+resp.Histogram2.numberOfValues+", (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
        xAxis: {
          categories: EndsDrilledH2.xAxis,
          crosshair: true,
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        credits: {
          enabled: false
        },
        source: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          data: EndsDrilledH2.yAxis
        }]


      }

      this.optionsHistogram3 = {
        chart: {
          type: 'column'
        },
        title: {
          text: EndsDrilledH3.name
        },
        subtitle: {
          text: "Mean: " + resp.Histogram3.mean+", Maximum: "+resp.Histogram3.histogramValues.maximum+", Minimum: "+resp.Histogram3.histogramValues.minimum+", Data Points: "+resp.Histogram3.numberOfValues+", (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
        xAxis: {
          categories: EndsDrilledH3.xAxis,
          crosshair: true,
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        credits: {
          enabled: false
        },
        source: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          data: EndsDrilledH3.yAxis
        }]


      }

      this.optionsHistogram4 = {
        chart: {
          type: 'column'
        },
        title: {
          text: EndsDrilledH4.name
        },
        subtitle: {
          text: "Mean: " + resp.Histogram4.mean+", Maximum: "+resp.Histogram4.histogramValues.maximum+", Minimum: "+resp.Histogram4.histogramValues.minimum+", Data Points: "+resp.Histogram4.numberOfValues+", (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
        xAxis: {
          categories: EndsDrilledH4.xAxis,
          crosshair: true,
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        credits: {
          enabled: false
        },
        source: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          data: EndsDrilledH4.yAxis
        }]


      }


      this.optionsHistogram5 = {
        chart: {
          type: 'column'
        },
        title: {
          text: EndsDrilledH5.name
        },
        subtitle: {
          text: "Mean: " + resp.Histogram5.mean+", Maximum: "+resp.Histogram5.histogramValues.maximum+", Minimum: "+resp.Histogram5.histogramValues.minimum+", Data Points: "+resp.Histogram5.numberOfValues+", (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
        xAxis: {
          categories: EndsDrilledH5.xAxis,
          crosshair: true,
          title: {
            text: ''
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        credits: {
          enabled: false
        },
        source: {
          enabled: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{
          data: EndsDrilledH5.yAxis
        }]


      }

      this.optionsLine = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Daily Ends Drilled Control Chart"
       },
       subtitle: {
          text: "Mean: " + mean[0]+", UCL: "+ucl[0].toFixed(2)+", LCL: "+lcl[0].toFixed(2)+" (Start Date: "+date[0]+" - End Date: "+date[date.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Daily Ends Drilled"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: ucl,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Daily Ends Drilled',
          data: measurements,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lcl,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine2 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "First 4 Hours Drilled Ends Control Chart"
       },
       subtitle: {
          text: "Mean: " + meanF4[0]+", UCL: "+uclF4[0].toFixed(2)+", LCL: "+lclF4[0].toFixed(2)+" (Start Date: "+dateF4[0]+" - End Date: "+dateF4[dateF4.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"First 4 Hours Drilled Ends"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclF4,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Daily Ends Drilled',
          data: measurementsF4,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclF4,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine3 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Daily Ends Supported"
       },
       subtitle: {
          text: "Mean: " + meanSuppoertedEnds[0]+", UCL: "+uclSuppoertedEnds[0].toFixed(2)+", LCL: "+lclSuppoertedEnds[0].toFixed(2)+" (Start Date: "+dateSuppoertedEnds[0]+" - End Date: "+dateSuppoertedEnds[dateSuppoertedEnds.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Daily Ends Supported"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclSuppoertedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Daily Supported Ends',
          data: measurementsSuppoertedEnds,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclSuppoertedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine4 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Supported Ends Buffer "
       },
       subtitle: {
          text: "Mean: " + meanSupportedEnds[0]+", UCL: "+uclSupportedEnds[0].toFixed(2)+", LCL: "+lclSupportedEnds[0].toFixed(2)+" (Start Date: "+dateSupportedEnds[0]+" - End Date: "+dateSupportedEnds[dateSupportedEnds.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Supported Ends"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclSupportedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Supported Ends',
          data: measurementsSupportedEnds,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclSupportedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine5 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Unlashed Ends"
       },
       subtitle: {
          text: "Mean: " + meanUnlashedEnds[0]+", UCL: "+uclUnlashedEnds[0].toFixed(2)+", LCL: "+lclUnlashedEnds[0].toFixed(2)+" (Start Date: "+dateUnlashedEnds[0]+" - End Date: "+dateUnlashedEnds[dateUnlashedEnds.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Unlashed Ends"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclUnlashedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Unlashed Ends',
          data: measurementsUnlashedEnds,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclUnlashedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine6 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Daily Tons Hoisted"
       },
       subtitle: {
          text: "Mean: " + meanHoistedTons[0]+", UCL: "+uclHoistedTons[0].toFixed(2)+", LCL: "+lclHoistedTons[0].toFixed(2)+" (Start Date: "+dateHoistedTons[0]+" - End Date: "+dateHoistedTons[dateHoistedTons.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Daily Tons Hoisted"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclHoistedTons,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Hoisted Tons',
          data: measurementsHoistedTons,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclHoistedTons,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine7 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Cleaned Ends"
       },
       subtitle: {
          text: "Mean: " + meanCleanedEnds[0]+", UCL: "+uclCleanedEnds[0].toFixed(2)+", LCL: "+lclCleanedEnds[0].toFixed(2)+" (Start Date: "+dateCleanedEnds[0]+" - End Date: "+dateCleanedEnds[dateCleanedEnds.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Cleaned Ends"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclCleanedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Hoisted Tons',
          data: measurementsCleanedEnds,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclCleanedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      this.optionsLine8 = {
        chart: {
          type: "spline"
       },
       title: {
          text: "Lashed & Prepared Ends"
       },
       subtitle: {
          text: "Mean: " + meanLashedPreparedEnds[0]+", UCL: "+uclLashedPreparedEnds[0].toFixed(2)+", LCL: "+lclLashedPreparedEnds[0].toFixed(2)+" (Start Date: "+dateLashedPreparedEnds[0]+" - End Date: "+dateLashedPreparedEnds[dateLashedPreparedEnds.length - 1]+")"
       },
       xAxis:{
          categories:date
       },
       yAxis: {          
          title:{
             text:"Lashed and Prepared Ends"
          } 
       },
       plotOptions: {
          series: {
             dataLabels: {
                enabled: false
             }
          }
       },
       credits: {
         enabled: false
       },
       source: {
         enabled: false
       },
       series: [{
          name: 'UCL',
          data: uclLashedPreparedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: false
       },
       {
          name: 'Hoisted Tons',
          data: measurementsLashedPreparedEnds,
          color: 'navy',
       },
       {
          name: 'LCL',
          data: lclLashedPreparedEnds,
          dashStyle: 'dash',
          color: 'red',
          marker: {enabled: false}
       }]

      }

      const axis = EndsDrilledBP.axis;
      this.data1 = [EndsDrilledBP.plotBoxValues.minimum, EndsDrilledBP.plotBoxValues.lowerQuartile, EndsDrilledBP.plotBoxValues.median, EndsDrilledBP.plotBoxValues.upperQuartile, EndsDrilledBP.plotBoxValues.maximum]

      this.optionsWhiskerBox1 = {
         chart: {
            type: 'boxplot'
          },
        
          title: {
            text: 'Daily Ends Drilled Box & Whisker'
          },

       subtitle: {
          text: "Mean: " + EndsDrilledBP.mean.toFixed(2)+", Number Of Values: "+EndsDrilledBP.numberOfValues+" (Date: "+EndsDrilledBP.axis+")"
       },
        
          legend: {
            enabled: false
          },

          credits: {
            enabled: false
          },
          source: {
            enabled: false
          },
        
          xAxis: {
            categories: [axis],
            title: {
              text: 'Date'
            }
          },
        
          yAxis: {
            title: {
              text: 'Daily Ends Drilled'
            }
          },
        
          tooltip: {
            formatter(tooltip) {
              let point = this.point;

              if (point.low === point.q1 || point.high === point.q1) {
                //point.low = null;
                //point.high = null;
              }
              return tooltip.defaultFormatter.call(this, tooltip);
            }
          },
        
          series: [{
            name: 'Daily Ends Drilled',
            data: [
              this.data1
            ],
            tooltip: {
              headerFormat: '<em>Daily Ends Drilled {point.key}</em><br/>',
            },  
            exporting: {
              buttons: {
                contextButton: {
                  menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                },
              },
         }
          }]
      }

      const axis2 = EndsDrilledBP.axis;
      this.data2 = [EndsDrilledBP2.plotBoxValues.minimum, EndsDrilledBP2.plotBoxValues.lowerQuartile, EndsDrilledBP2.plotBoxValues.median, EndsDrilledBP2.plotBoxValues.upperQuartile, EndsDrilledBP2.plotBoxValues.maximum]

      this.optionsWhiskerBox2 = {
         chart: {
            type: 'boxplot'
          },
        
          title: {
            text: 'First 4 Hours Drilled Ends Box & Whisker'
          },
          subtitle: {
            text: "Mean: " + EndsDrilledBP2.mean.toFixed(2)+", Number Of Values: "+EndsDrilledBP2.numberOfValues+" (Date: "+EndsDrilledBP2.axis+")"
         },
        
          legend: {
            enabled: false
          },

          credits: {
            enabled: false
          },
          source: {
            enabled: false
          },
        
          xAxis: {
            categories: [axis2],
            title: {
              text: 'Date'
            }
          },
        
          yAxis: {
            title: {
              text: 'First 4 Hours Drilled Ends'
            }
          },
        
          tooltip: {
            formatter(tooltip) {
              let point = this.point;

              if (point.low === point.q1 || point.high === point.q1) {
                //point.low = null;
                //point.high = null;
              }
              return tooltip.defaultFormatter.call(this, tooltip);
            }
          },
        
          series: [{
            name: 'First 4 Hours Drilled Ends',
            data: [
              this.data2
            ],
            tooltip: {
              headerFormat: '<em>First 4 Hours Drilled Ends {point.key}</em><br/>',
            },  
            exporting: {
              buttons: {
                contextButton: {
                  menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                },
              },
         }
          }]
         }

      const axis3 = EndsDrilledBP3.axis;
      this.data3 = [EndsDrilledBP3.plotBoxValues.minimum, EndsDrilledBP3.plotBoxValues.lowerQuartile, EndsDrilledBP3.plotBoxValues.median, EndsDrilledBP3.plotBoxValues.upperQuartile, EndsDrilledBP3.plotBoxValues.maximum]

      this.optionsWhiskerBox3 = {
         chart: {
            type: 'boxplot'
          },
        
          title: {
            text: 'Daily Ends Supported Box & Whisker'
          },
          subtitle: {
            text: "Mean: " + EndsDrilledBP3.mean.toFixed(2)+", Number Of Values: "+EndsDrilledBP3.numberOfValues+" (Date: "+EndsDrilledBP3.axis+")"
         },
        
          legend: {
            enabled: false
          },

          credits: {
            enabled: false
          },
          source: {
            enabled: false
          },
        
          xAxis: {
            categories: [axis3],
            title: {
              text: 'Date'
            }
          },
        
          yAxis: {
            title: {
              text: 'Daily Ends Supported'
            }
          },
        
          tooltip: {
            formatter(tooltip) {
              let point = this.point;

              if (point.low === point.q1 || point.high === point.q1) {
                //point.low = null;
                //point.high = null;
              }
              return tooltip.defaultFormatter.call(this, tooltip);
            }
          },
        
          series: [{
            name: 'Daily Ends Supported',
            data: [
              this.data3
            ],
            tooltip: {
              headerFormat: '<em>Daily Ends Supported {point.key}</em><br/>',
            },  
            exporting: {
              buttons: {
                contextButton: {
                  menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                },
              },
         }
          }]
      }

      const axis4 = EndsDrilledBP4.axis;
      this.data4 = [EndsDrilledBP4.plotBoxValues.minimum, EndsDrilledBP4.plotBoxValues.lowerQuartile, EndsDrilledBP4.plotBoxValues.median, EndsDrilledBP4.plotBoxValues.upperQuartile, EndsDrilledBP4.plotBoxValues.maximum]

      this.optionsWhiskerBox4 = {
         chart: {
            type: 'boxplot'
          },
        
          title: {
            text: 'Supported Ends Box & Whisker'
          },
          subtitle: {
            text: "Mean: " + EndsDrilledBP4.mean.toFixed(2)+", Number Of Values: "+EndsDrilledBP4.numberOfValues+" (Date: "+EndsDrilledBP4.axis+")"
         },
        
          legend: {
            enabled: false
          },

          credits: {
            enabled: false
          },
          source: {
            enabled: false
          },
        
          xAxis: {
            categories: [axis4],
            title: {
              text: 'Date'
            }
          },
        
          yAxis: {
            title: {
              text: 'Supported Ends'
            }
          },
        
          tooltip: {
            formatter(tooltip) {
              let point = this.point;

              if (point.low === point.q1 || point.high === point.q1) {
                //point.low = null;
                //point.high = null;
              }
              return tooltip.defaultFormatter.call(this, tooltip);
            }
          },
        
          series: [{
            name: 'Supported Ends',
            data: [
              this.data4
            ],
            tooltip: {
              headerFormat: '<em>Supported Ends {point.key}</em><br/>',
            },  
            exporting: {
              buttons: {
                contextButton: {
                  menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                },
              },
         }
          }]
         }

         const axis5 = EndsDrilledBP5.axis;
         this.data5 = [EndsDrilledBP5.plotBoxValues.minimum, EndsDrilledBP5.plotBoxValues.lowerQuartile, EndsDrilledBP5.plotBoxValues.median, EndsDrilledBP5.plotBoxValues.upperQuartile, EndsDrilledBP5.plotBoxValues.maximum]
   
         this.optionsWhiskerBox5 = {
            chart: {
               type: 'boxplot'
             },
           
             title: {
               text: 'Daily Tons Hoisted Box '
             },
             subtitle: {
               text: "Mean: " + EndsDrilledBP5.mean.toFixed(2)+", Number Of Values: "+EndsDrilledBP5.numberOfValues+" (Date: "+EndsDrilledBP5.axis+")"
            },
           
             legend: {
               enabled: false
             },
   
             credits: {
               enabled: false
             },
             source: {
               enabled: false
             },
           
             xAxis: {
               categories: [axis5],
               title: {
                 text: 'Date'
               }
             },
           
             yAxis: {
               title: {
                 text: 'Tons Hoisted'
               }
             },
           
             tooltip: {
               formatter(tooltip) {
                 let point = this.point;
   
                 if (point.low === point.q1 || point.high === point.q1) {
                   //point.low = null;
                   //point.high = null;
                 }
                 return tooltip.defaultFormatter.call(this, tooltip);
               }
             },
           
             series: [{
               name: 'Tons Hoisted',
               data: [
                 this.data5
               ],
               tooltip: {
                 headerFormat: '<em>Tons Hoisted {point.key}</em><br/>',
               },  
               exporting: {
                 buttons: {
                   contextButton: {
                     menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
                   },
                 },
            }
             }]
            }


      Highcharts.chart('lineChart1', this.optionsLine);
      Highcharts.chart('lineChart2', this.optionsLine2);
      Highcharts.chart('lineChart3', this.optionsLine3);
      Highcharts.chart('lineChart4', this.optionsLine4);
      Highcharts.chart('lineChart5', this.optionsLine5);
      Highcharts.chart('lineChart6', this.optionsLine6);
      Highcharts.chart('lineChart7', this.optionsLine7);
      Highcharts.chart('lineChart8', this.optionsLine8);
      Highcharts.chart("whiskerBox1", this.optionsWhiskerBox1);
      Highcharts.chart("whiskerBox2", this.optionsWhiskerBox2);
      Highcharts.chart("whiskerBox3", this.optionsWhiskerBox3);
      Highcharts.chart("whiskerBox4", this.optionsWhiskerBox4);
      Highcharts.chart("whiskerBox5", this.optionsWhiskerBox5);
      Highcharts.chart('histogramChart1', this.optionsHistogram1);
      Highcharts.chart('histogramChart2', this.optionsHistogram2);
      Highcharts.chart('histogramChart3', this.optionsHistogram3);
      Highcharts.chart('histogramChart4', this.optionsHistogram4);
      Highcharts.chart('histogramChart5', this.optionsHistogram5);*/
      this.loading = false;
    }, (error:any)=>{
      console.log(error);
      this.toastrService.error(error.error);
      this.loading = false;
    })
    }else{
      this.loading = false;
      alert('Make sure your dates makes sense!');
    } 



    //Highcharts.chart('whiskerBox1', this.optionsWhiskerBox);

    this.loading = false;
  }

  back(){
    this.router.navigate(['/binmak/my-assets']);
  }

}

export class ControlLimit{
  chartName: string;
  dates: Array<string>;
  measurements: Array<number>;
  ucl: number;
  lcl: number;
  mean: number;
}

export class MasterChart{
  controlLimit: ControlLimit;
  endDate: string;
  startDate: string;
  kpaName: string;
  plotBox: any;
  histogram: any;
  kpaId: number
}

export class ChartNameObject{
  chartName: string;
}
