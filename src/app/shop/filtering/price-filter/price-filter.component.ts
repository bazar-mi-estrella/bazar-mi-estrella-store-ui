import { ActivatedRoute, Router } from '@angular/router';
import { Component, Output, Input, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { ViewportScroller } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent {
  // Using Output EventEmitter
  @Output() priceFilter: EventEmitter<any> = new EventEmitter<number>();

  // define min, max and range
  @Input() min!: number;
  @Input() max!: number;

  public collapse: boolean = true;
  public isBrowser: boolean = false;

  public price: { pricemin: number; pricemax: number } = {
    pricemin: 0,
    pricemax: this.productService.maxPrice,
  };

  options: Options = {
    floor: 0,
    ceil: this.productService.maxPrice,
    hidePointerLabels: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true; // for ssr
    }
  }

  ngOnInit(): void { }

  // Range Changed
  appliedFilter(event: ChangeContext) {
    this.price = { pricemin: event.value, pricemax: event.highValue ?? 0 };
    this.priceFilter.emit(this.price);
  }

  // handle price filtering
  handlePriceRoute() {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.price,
        queryParamsHandling: 'merge', // preserve the existing query params in the route
        skipLocationChange: false, // do trigger navigation
      })
      .finally(() => {
        this.viewScroller.setOffset([120, 120]);
        this.viewScroller.scrollToAnchor('products')
      });
  }
}
