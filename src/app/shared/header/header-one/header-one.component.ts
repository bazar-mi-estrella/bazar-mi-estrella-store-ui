import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '@/shared/services/cart.service';
import { IProduct } from '@/types/product-type';
import { WishlistService } from '@/shared/services/wishlist.service';
import { Router } from '@angular/router';
import { UtilsService } from '@/shared/services/utils.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
})
export class HeaderOneComponent {

  public products: IProduct[] = [];
  public searchText: string = '';
  public productType: string = '';

  isLoggin = sessionStorage.getItem('auth_id') ?? false;
  fullname: string = sessionStorage.getItem('name') ?? "";
  email: string = sessionStorage.getItem('email') ?? "";
  photo_url = sessionStorage.getItem('photo_url');

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public utilsService: UtilsService,
    private readonly router: Router,
  ) {
    console.log("Esta es la foto ", this.photo_url);
   }


  // select options for header category
  public niceSelectOptions = [
    { value: 'select-category', text: 'Select Category' },
    { value: 'electronics', text: 'Electronics' },
    { value: 'fashion', text: 'Fashion' },
    { value: 'beauty', text: 'Beauty' },
    { value: 'jewelry', text: 'Jewelry' },
  ];




  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);
    this.productType = selectedOption.value;
  }

  signIn() {
    if (!this.isLoggin) this.router.navigate(['/pages/login'])
    else this.router.navigate(['/pages/profile']);
  }

  headerSticky: boolean = false;

  // sticky nav
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if (!this.searchText && !this.productType) {
      return
    }
    else {
      if (this.searchText) {
        queryParams['searchText'] = this.searchText;
      }
      if (this.productType) {
        queryParams['productType'] = this.productType;
      }
      this.router.navigate(['/pages/search'], { queryParams });
    }
  }
}
