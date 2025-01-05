import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-electronic-trending-products',
  templateUrl: './electronic-trending-products.component.html',
  styleUrls: ['./electronic-trending-products.component.scss']
})
export class ElectronicTrendingProductsComponent implements OnInit {
  // electronic prd
  public electronic_prd: IProduct[] = [];

    // tab
    public activeTab = 'New';
    public tabs = ['Nuevo', 'Featured', 'Top Sellers'];

    // filtered Products
  // filteredProducts = this.getFilteredProducts(); // Initialize with default filtering
  filteredProducts: IProduct[]=[]; // Initialize with default filtering


  constructor(
    private cdr: ChangeDetectorRef, 
    public productService: ProductService) {

    // this.productService.products.subscribe((products) => {
    //   this.electronic_prd = products.filter((p) => p.productType === 'electronics');
    //   this.filteredProducts = this.getFilteredProducts();
    // });
    
  }

  ngOnInit(): void {
    this.getProductsTrending();
  }

  getProductsTrending() {
    return this.productService.getProductsTrending().subscribe((products) => {
      console.log(products);
      this.filteredProducts=products;
    });
  }

  

  // handleActiveTab
  handleActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filteredProducts = this.getFilteredProducts(); // Update the filtered products
    this.cdr.detectChanges(); // Trigger change detection
  }

  // get Filtered Products
  getFilteredProducts(): IProduct[] {
    if (this.activeTab === 'New') {
      return this.electronic_prd.slice(0, 8);
    } else if (this.activeTab === 'Featured') {
      return this.electronic_prd.filter((product) => product.featured);
    } else if (this.activeTab === 'Top Sellers') {
      return this.electronic_prd
        .slice()
        .sort((a, b) => (b.sellCount ?? 0) - (a.sellCount ?? 0))
        .slice(0, 8);
    } else {
      return [];
    }
  }



}
