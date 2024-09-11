import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
 
@Component({
  selector: 'app-analysis-prodact',
  templateUrl: './analysis-prodact.component.html',
  styleUrl: './analysis-prodact.component.css'
})
export class AnalysisProdactComponent {

  chart: any;
 
  chartOptions = {
animationEnabled: true,
theme: "light2",
title: {
    text: "Catagory Analysis"
},
axisX: {
    title: "Prodact"
},
axisY: {
    title: "Pordact markets",
    interval: 20,
    suffix: "k",
    prefix: "$"
}, 
data: [{
    type: "rangeBar",
    showInLegend: true,
    yValueFormatString: "$#0.#K",
    // indexLabel: "{y[#index]}",
    legendText: "Department wise Salary Range",
    color: "#6d78ad",
    dataPoints: [
  { x: 10, y:[0, 80], label: "100% Organic" },
  { x: 20, y:[0, 50], label: "Organic" },
  { x: 30, y:[0, 70], label: "Made with organic ingredients" },
  { x: 40, y:[0, 30], label: "70% organic" },
     ]
      }]
  }	

}
