import { CartService } from '@/shared/services/cart.service';
import { UtilsService } from '@/shared/services/utils.service';
import { WishlistService } from '@/shared/services/wishlist.service';
import { IProduct } from '@/types/product-type';
import { Component, Input } from '@angular/core';
import { SharedModule } from "../../../../shared/shared.module";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

    @Input() product!: IProduct;
    @Input() offer_style: Boolean | undefined;
  
    constructor(
      public cartService: CartService,
      public wishlistService: WishlistService,
      public utilsService: UtilsService,
    ) { }
    // add to cart
    addToCart(product: IProduct) {
      this.cartService.addCartProduct(product);
    }
    // add to cart
    addToWishlist(product: IProduct) {
      this.wishlistService.add_wishlist_product(product);
    }
  
    // Function to check if an item is in the cart
    isItemInCart(item: IProduct): boolean {
      return this.cartService.getCartProducts().some((prd: IProduct) => prd.id === item.id);
    }
    isItemInWishlist(item: IProduct): boolean {
      return this.wishlistService.getWishlistProducts().some((prd: IProduct) => prd.id === item.id);
    }
    productStatus(product: IProduct): boolean {
      return product.status === 'out-of-stock' || product.quantity === 0;
    }

}
