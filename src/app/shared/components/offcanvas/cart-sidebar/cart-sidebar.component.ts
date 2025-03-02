import { Component } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { IProduct } from '@/types/product-type';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent {

  constructor(public cartService: CartService) {  }

  getPrice(product: IProduct) {
    let price = product.price;
    if(product.discount) price= price - product.discount;
    return (price * (product.orderQuantity ?? 0)).toFixed(2)
  }
}
