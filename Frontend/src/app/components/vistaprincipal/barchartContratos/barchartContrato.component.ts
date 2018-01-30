import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'barchart',
  templateUrl: 'barchart.html'
})

export class BarChartContratoComponent implements OnInit {
  public barChartOptions:any;
  public barChartLabels:string[];
  public barChartType:string;
  public barChartLegend:boolean;
 
  public barChartData:any[];

  constructor(){
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }
}