import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chartlineCliente',
  templateUrl: 'chartline.html'
})
export class ChartlineClienteComponent implements OnInit {
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(){
    this.lineChartData = [
      {data: [65, 59, 50, 81, 56, 55, 40], label: 'Series A'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.lineChartOptions = {responsive: true};
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(0, 0, 0, 0.52)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // grey
        backgroundColor: 'rgba(6, 178, 155, 0.91)',
        borderColor: 'rgba(3, 89, 39, 0.85)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }

  ngOnInit(){
    //console.log('el componente chartlineCliente ha sido cargado');
  }
}