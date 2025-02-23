import { Component, Input } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ProductService } from 'src/app/shared/services/product.service';
import { CartService } from '@/shared/services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details-wrapper',
  templateUrl: './product-details-wrapper.component.html',
  styleUrls: ['./product-details-wrapper.component.scss'],
})
export class ProductDetailsWrapperComponent {
  @Input() product!: IProduct;
  @Input() isShowBottom: boolean = true;
  textMore = false;

  handleTextToggle() {
    this.textMore = !this.textMore;
  }

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    private sanitizer: DomSanitizer
  ) { }

  handleIsColorVariant(product: IProduct) {
    if (product.images.some((item) => item?.codecolor && item?.namecolor)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() { }

  // Devuelve la descripción sanitizada y truncada si es necesario
  get sanitizedDescription() {
    const description = this.textMore ? this.product.description : (this.product.description.substring(0, 100) + '...');
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }
}
