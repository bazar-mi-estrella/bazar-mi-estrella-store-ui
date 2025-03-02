import { CartService } from '@/shared/services/cart.service';
import { CompareService } from '@/shared/services/compare.service';
import { IProduct } from '@/types/product-type';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent {

  constructor(
    public compareService: CompareService,
    public cartService: CartService
  ) { }

}
