import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  product_ids: any[] = [];
  quantities: number[] = [];
  products: any[] = [];
  totalPrice: number = 0;
  user_id: number = 0;
  address: any = {
    first_line: '',
    city: '',
    state: '',
    pincode: ''
  };
  access: any = sessionStorage.getItem("access");

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`
    });

    // Fetch user details and cart data in parallel
    this.http.get('http://localhost:8000/api/users/get_user', { headers }).subscribe(
      (response: any) => {
        this.address = {
          first_line: response.data.first_line,
          city: response.data.city,
          state: response.data.state,
          pincode: response.data.pincode
        };
        this.product_ids = response.data.cart_product_ids;
        this.user_id = response.data.id;
        this.quantities = response.data.quantities;
        this.fetchProductDetails(headers);
      },
      (error: any) => {
        console.error('Error fetching user and cart data', error);
      }
    );
  }

  // Method to handle address change and update server
  onAddressChange(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json'
    });

    console.log('Updating address:', this.address);

    // Update user address whenever a change occurs
    this.http.patch('http://localhost:8000/api/users/get_user', this.address, { headers }).subscribe(
      (response: any) => {
        console.log('Address updated successfully', response);
      },
      (error: any) => {
        console.error('Error updating address:', error);
      }
    );
  }

  fetchProductDetails(headers: HttpHeaders): void {
    if (this.product_ids.length > 0) {
      const productRequests: Observable<any>[] = this.product_ids.map(productId =>
        this.http.get(`http://localhost:8000/api/Product_Table/${productId}`, { headers })
      );

      forkJoin(productRequests).subscribe(
        (responses: any[]) => {
          this.products = responses;
          this.calculateTotalPrice();
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  increaseQuantity(index: number): void {
    if (this.quantities[index] < this.products[index].P_Stock) {
      this.quantities[index]++;
      this.updateCartQuantity();
    }
  }

  decreaseQuantity(index: number): void {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
      this.updateCartQuantity();
    }
  }

  updateCartQuantity(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json',
    });

    const payload = { quantities: this.quantities };

    this.http.patch('http://localhost:8000/api/users/get_user', payload, { headers }).subscribe(
      (response: any) => {
        console.log('Cart updated successfully', response);
        this.calculateTotalPrice();
      },
      (error: any) => {
        console.error('Error updating cart quantity:', error);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((total, product, index) => {
      return total + (this.quantities[index] * product.P_Price);
    }, 0);
  }

  deleteProduct(index: number): void {
    this.product_ids.splice(index, 1);
    this.quantities.splice(index, 1);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json',
    });

    const payload = {
      cart_product_ids: this.product_ids,
      quantities: this.quantities
    };

    this.http.patch('http://localhost:8000/api/users/get_user', payload, { headers }).subscribe(
      (response: any) => {
        console.log('Product deleted successfully from cart', response);
        this.fetchProductDetails(headers);
        this.calculateTotalPrice();
      },
      (error: any) => {
        console.error('Error deleting product from cart:', error);
      }
    );
  }
  updateProductStock(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      // 'Content-Type' should be omitted because the browser sets it automatically for FormData
    });
  
    if (this.product_ids.length > 0) {
      const productRequests: Observable<any>[] = this.product_ids.map(productId =>
        this.http.get(`http://localhost:8000/api/Product_Table/${productId}`, { headers })
      );
  
      forkJoin(productRequests).subscribe(
        (responses: any[]) => {
          const stockUpdateRequests: Observable<any>[] = responses.map((product, index) => {
            const updatedStock = product.P_Stock - this.quantities[index];
  
            console.log(`Updating stock for product ID ${product.id}: ${updatedStock}`);
  
            // Create FormData to handle file uploads properly
            const formData = new FormData();
            // formData.append('id', product.id);
            formData.append('P_Name', product.P_Name);
            formData.append('P_description', product.P_description);
            formData.append('P_Price', product.P_Price.toString());
            formData.append('P_Stock', updatedStock.toString());
            formData.append('P_Category_id', product.P_Category_id.toString());
            formData.append('P_Brand', product.P_Brand);
            console.log(product.P_image);
            // Check if P_image is a data URI or a URL
            if (product.P_image && product.P_image.startsWith('data:image/')) {
              // Convert data URI to Blob
              const blob = this.dataURItoBlob(product.P_image);
              formData.append('P_image', blob, 'image.jpg');  // Replace 'image.jpg' with the appropriate filename
            } else if (product.P_image) {
              // If it's already a URL, append it directly
              formData.append('P_image', product.P_image);
            }
            formData.forEach((value, key) => {
              console.log(`${key}:`, value);
            });
  
            // Use PUT to update the entire product data
            return this.http.put(`http://localhost:8000/api/Product_Table/${product.id}/`, formData, { headers });
          });
          forkJoin(stockUpdateRequests).subscribe(
            (updateResponses: any[]) => {
              console.log('Stock updates successful:', updateResponses);
            },
            (updateError: any) => {
              console.error('Error updating stock:', updateError);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }
  
  // Utility function to convert a Data URI to a Blob
  dataURItoBlob(dataURI: string): Blob {
    try {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } catch (e) {
      console.error("Invalid Base64 string provided:", e);
      throw new Error("Invalid Base64 string provided for image conversion.");
    }
  }
  
  
  
  


  buyNow() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access}`,
      'Content-Type': 'application/json',
    });

    const updatedaddress = {
      first_line: this.address.first_line,
      city: this.address.city,
      state: this.address.state,
      pincode: this.address.pincode
    };

    this.http.patch('http://localhost:8000/api/users/get_user', updatedaddress, { headers }).subscribe(
      (response: any) => {
        console.log('Address updated successfully', response);

        let payload = {
          shipping_status: "pending",
          first_line: this.address.first_line,
          city: this.address.city,
          state: this.address.state,
          pincode: this.address.pincode
        };

        this.http.post('http://localhost:8000/api/shipping/', payload, { headers }).subscribe(
          (response: any) => {
            const Shipping_id = response.id;
            console.log('Shipping created successfully', response);

            const orderData = {
              user_id: this.user_id,
              shipping: Shipping_id,
              total_price: this.totalPrice,
              product_ids: this.product_ids,
              quantity: this.quantities,
            };

            console.log(orderData);

            this.http.post('http://localhost:8000/api/orders/', orderData, { headers }).subscribe(
              (response) => {
                console.log('Order placed successfully', response);
                alert('Order placed successfully!');
                this.updateProductStock();  // Update product stock before clearing the cart
                this.clearCart(headers);
                this.router.navigate(['/orders']);
              },
              (error) => {
                console.error('Error placing order', error);
                alert('Error placing order. Please try again.');
              }
            );
          },
          (error: any) => {
            console.error('Error creating shipping:', error);
            alert('Error creating shipping. Please check the address details and try again.');
          }
        );
      },
      (error: any) => {
        console.error('Error updating address:', error);
        alert('Error updating address. Please try again.');
      }
    );
  }


  clearCart(headers: HttpHeaders): void {
    const payload = {
      cart_product_ids: [],
      quantities: []
    };

    this.http.patch('http://localhost:8000/api/users/get_user', payload, { headers }).subscribe(
      (response: any) => {
        console.log('Cart cleared successfully', response);
        this.product_ids = [];
        this.quantities = [];
        this.products = [];
        this.totalPrice = 0;
      },
      (error: any) => {
        console.error('Error clearing cart:', error);
      }
    );
  }
}
