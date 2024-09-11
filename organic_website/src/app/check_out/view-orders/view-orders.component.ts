import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  access: string | null = '';

  constructor(private http: HttpClient, private router: Router) {
    this.access = sessionStorage.getItem('access');
  }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    // Fetch orders from API
    this.http.get('http://localhost:8000/api/orders/', { headers }).subscribe(
      (response: any) => {
        let actual_user_id = sessionStorage.getItem("user_id");  // Fetch the actual user ID from sessionStorage

        response.forEach((order: any) => {
          if (order.user_id === parseInt(actual_user_id || '0', 10)) {
            let orderData = {
              shipping_id: order.shipping,
              order_date: order.order_date,
              total_price: order.total_price,
              quantities: order.quantity,
              products: [] as any[],
              user_id: order.user_id,
              shipping_details: null, // Placeholder for shipping details
              showDetails: false // Add showDetails property
            };

            this.orders.push(orderData);
            this.fetchProductDetails(order.product_ids, orderData);
            this.fetchShippingDetails(order.shipping, orderData); // Fetch shipping details
          }
        });
      },
      (error: any) => {
        console.error('Error when fetching data:', error);
      }
    );
  }

  fetchProductDetails(product_ids: string[], orderData: any): void {
    if (product_ids.length > 0) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access}`,
        'Content-Type': 'application/json'
      });

      product_ids.forEach((productId, index) => {
        this.http.get(`http://localhost:8000/api/Product_Table/${productId}`, { headers }).subscribe(
          (response: any) => {
            orderData.products.push(response);
          },
          (error: any) => {
            console.error('Error when fetching product details:', error);
          }
        );
      });
    }
  }

  fetchShippingDetails(shipping_id: number, orderData: any): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json'
    });

    // Fetch shipping details from API
    this.http.get(`http://localhost:8000/api/shipping/${shipping_id}`, { headers }).subscribe(
      (response: any) => {
        orderData.shipping_details = response;  // Store the shipping details in the order data
      },
      (error: any) => {
        console.error('Error when fetching shipping details:', error);
      }
    );
  }

  toggleDetails(orderIndex: number): void {
    this.orders[orderIndex].showDetails = !this.orders[orderIndex].showDetails; // Toggle the showDetails property
  }

  cancelOrder(order: any, orderIndex: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json'
    });

    // API request to cancel the order
    this.http.patch(`http://localhost:8000/api/shipping/${order.shipping_id}/`, 
      { shipping_status: 'cancelled' }, { headers }).subscribe(
      (response: any) => {
        console.log('Order cancelled successfully:', response);
        this.orders[orderIndex].shipping_details.shipping_status = 'cancelled'; // Update the status locally
      },
      (error: any) => {
        console.error('Error when cancelling order:', error);
      }
    );
  }
}
