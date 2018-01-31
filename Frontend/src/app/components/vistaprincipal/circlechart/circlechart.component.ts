import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'circlechart',
  templateUrl: 'circlechart.html'
})

export class CircleChartComponent implements OnInit {
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  public barChartLegend:boolean = false;
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(){
    
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }
}