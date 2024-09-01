import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() {
    // Fetch all products
    fetch(this.apiUrl)
      .then(res => res.json())
      .then(json => console.log('All Products:', json)) // Log all products
      .catch(error => console.error('Error fetching products:', error)); // Handle error

    // Fetch a limited number of products (e.g., top 5)
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(json => console.log('Limited Products:', json)) // Log limited products
      .catch(error => console.error('Error fetching limited products:', error)); // Handle error

    // Fetch products sorted by a specific parameter (e.g., descending price)
    fetch('https://fakestoreapi.com/products?sort=desc')
      .then(res => res.json())
      .then(json => console.log('Sorted Products:', json)) // Log sorted products
      .catch(error => console.error('Error fetching sorted products:', error)); // Handle error

    // Fetch all product categories
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => console.log('All Categories:', json)) // Log all categories
      .catch(error => console.error('Error fetching categories:', error)); // Handle error

    // Fetch products in a specific category (e.g., jewelry)
    fetch('https://fakestoreapi.com/products/category/jewelery')
      .then(res => res.json())
      .then(json => console.log('Products in Category:', json)) // Log products in category
      .catch(error => console.error('Error fetching products by category:', error)); // Handle error

    // Add a new product
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }),
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      }
    })
      .then(res => res.json())
      .then(json => console.log('Added Product:', json)) // Log added product
      .catch(error => console.error('Error adding product:', error)); // Handle error

    // Update an existing product
    fetch('https://fakestoreapi.com/products/7', {
      method: "PUT",
      body: JSON.stringify({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }),
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      }
    })
      .then(res => res.json())
      .then(json => console.log('Updated Product:', json)) // Log updated product
      .catch(error => console.error('Error updating product:', error)); // Handle error

    // Delete a product
    fetch('https://fakestoreapi.com/products/6', {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => console.log('Deleted Product:', json)) // Log deleted product
      .catch(error => console.error('Error deleting product:', error)); // Handle error

  }
}
