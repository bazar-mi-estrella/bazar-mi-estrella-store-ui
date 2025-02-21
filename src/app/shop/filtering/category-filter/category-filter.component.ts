import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import category_data from '@/data/category-data';
import { ICategory } from '@/types/category-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { TypeMarcaModelService } from '@/shared/services/typemarcmodel.service';
import { TypeMarcModel } from '@/types/typemarcmodel.interface';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public categoryData: ICategory[] = category_data;
  activeQuery: string = '';
  listTypes:TypeMarcModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    private typeMarcaModelService:TypeMarcaModelService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((queryParams) => {
      this.activeQuery = queryParams['type'];
    });
    this.listTypes=await this.typeMarcaModelService.getAllTypes().toPromise() ?? [];
  }

  handleCategoryRoute(value: string): void {
    const newCategory = value.toLowerCase().replace('&', '').split(' ').join('-');

    // Define the query parameters as an object
    const queryParams: Params = {
      type: newCategory,
    };

    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams, // Pass the queryParams object here
        queryParamsHandling: 'merge',
        skipLocationChange: false,
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products'); // Anchore Link
      });
  }
}
