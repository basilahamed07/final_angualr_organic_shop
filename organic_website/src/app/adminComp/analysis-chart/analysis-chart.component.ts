import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CanvasJSChart } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-analysis-chart',
  templateUrl: './analysis-chart.component.html',
  styleUrls: ['./analysis-chart.component.css']
})
export class AnalysisChartComponent implements OnInit, AfterViewInit {
  data: any[] = []; // Array to hold the product data
  access: string | null = sessionStorage.getItem("access");
  chartOptions: any;
  usernumber:any
  shipping:any
  order:any
  feedback:any
  constructor(private apiservice: HttpClient, private route: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    // Initialize chart options after the view is initialized
    this.chartdata();
    this.usercount();
    this.orderscount();
    this.shippingcount();
    this.feedbackcount()

  }

  chartdata() {
    this.chartOptions = {
      animationEnabled: true, // Enable animation to make the chart more engaging
      backgroundColor: "#F5DEB3",
      title: {
        text: "Order Analysis"
      },
      axisY: {
        title: "Total Price",
        valueFormatString: "#0,,.",
        suffix: "K" // Use 'K' for thousands if necessary, adjust as needed
      },
      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        xValueFormatString: "YYYY-MM-DD", // Adjust the format if necessary
        dataPoints: [] // Initialize as empty
      }]
    };
  }

  fetchData() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/orders/', { headers })
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data
          console.log('Data fetched successfully', this.data);
          this.updateChart(); // Update the chart with the fetched data
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  updateChart() {
    // Transform the fetched data into dataPoints
    const dataPoints = this.data.map((item: any) => ({
      x: new Date(item.order_date),
      y: item.total_price // Use 'total_price' as the value
    }));

    if (this.chartOptions) {
      this.chartOptions.data[0].dataPoints = dataPoints;

      // Manually trigger change detection to update the chart
      this.cdr.detectChanges();
    }
  }



  // featch the data for users
  usercount() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/admin/users/', { headers })
      .subscribe(
        (response: any) => {
          this.usernumber = response.length;
          console.log(response) // Store the fetched data
      })
    }

  // featch the data for users
  orderscount() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/orders/', { headers })
      .subscribe(
        (response: any) => {
          this.order = response.length; 
          console.log("usercount",this.usernumber)// Store the fetched data
          console.log(this.order)// Store the fetched data
      })


}
  shippingcount() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/shipping/', { headers })
      .subscribe(
        (response: any) => {
          this.shipping = response.length; // Store the fetched data
      })


}
  feedbackcount() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    this.apiservice.get('http://localhost:8000/api/feedback/', { headers })
      .subscribe(
        (response: any) => {
          this.feedback = response.length; // Store the fetched data
      })


}
}
