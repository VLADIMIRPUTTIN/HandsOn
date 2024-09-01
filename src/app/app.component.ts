import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ThriftStore';
  products: any[] = [];
  displayedProducts: any[] = [];
  selectedProduct: any = null;
  isUpdatingProduct = false;
  updateProduct: any = {};
  currentPage = 1;
  itemsPerPage = 6; // Number of items to show per page
currentProducts: any;

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products
  loadProducts(): void {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.products = data;
        this.updateDisplayedProducts();
        console.log('Products loaded:', this.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error.message);
        alert('Failed to load products. Please check the console for details.');
      });
  }

  // Update the list of displayed products based on the current page
  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  // Handle the "Next" button click
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.products.length) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  // Handle the "Previous" button click
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  // Open the modal for viewing product details
  openModal(product: any): void {
    this.selectedProduct = product;
  }

  // Close the product detail modal
  closeProductDetail(): void {
    this.selectedProduct = null;
  }

  // Open the modal for updating a product
  openUpdateModal(product: any): void {
    this.updateProduct = { ...product };
    this.isUpdatingProduct = true;
  }

  // Close the update modal
  closeUpdateModal(): void {
    this.isUpdatingProduct = false;
    this.updateProduct = {};
  }

  // Save the updated product details
  saveUpdatedProduct(): void {
    fetch(`https://fakestoreapi.com/products/${this.updateProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(this.updateProduct),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Updated Product:', data);

      // Update the product in the local products array
      const index = this.products.findIndex(p => p.id === data.id);
      if (index !== -1) {
        this.products[index] = data;
        this.updateDisplayedProducts(); // Update displayed products
      }
      this.closeUpdateModal();
    })
    .catch(error => console.error('Error updating product:', error));
  }

  // Add a new product
  addProduct(): void {
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify({
        title: 'New Product',
        price: 20.0,
        description: 'This is a new product.',
        image: 'https://i.pravatar.cc',
        category: 'electronics'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Added Product:', data);
      this.loadProducts(); // Reload products after adding
    })
    .catch(error => console.error('Error adding product:', error));
  }

  // Delete a product
  deleteProduct(id: number): void {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        console.log('Deleted Product:', id);
        this.products = this.products.filter(product => product.id !== id);
        this.updateDisplayedProducts(); // Update displayed products
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    })
    .catch(error => console.error('Error deleting product:', error));
  }

  // Method to sort products by price
  sortByPrice(order: 'asc' | 'desc'): void {
    this.products.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    this.updateDisplayedProducts(); // Update displayed products
    console.log('Products sorted by price:', this.products);
  }

  // Method to sort products by title
  sortByTitle(order: 'asc' | 'desc'): void {
    this.products.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (order === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    this.updateDisplayedProducts(); // Update displayed products
    console.log('Products sorted by title:', this.products);
  }
}
