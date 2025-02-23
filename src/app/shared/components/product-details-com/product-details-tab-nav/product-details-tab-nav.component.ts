import { Component,ElementRef,Renderer2,ViewChild,Input } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details-tab-nav',
  templateUrl: './product-details-tab-nav.component.html',
  styleUrls: ['./product-details-tab-nav.component.scss']
})
export class ProductDetailsTabNavComponent {
  @ViewChild('navActive') navActive!: ElementRef;
  @ViewChild('productTabMarker') productTabMarker!: ElementRef;

  @Input () product! : IProduct;

  constructor(private renderer: Renderer2,private sanitizer: DomSanitizer) {}

  handleActiveMarker(event: Event): void {
    const marker = document.getElementById("productTabMarker");
    if (marker && event.target) {
      marker.style.left = (event.target as HTMLButtonElement).offsetLeft + "px";
      marker.style.width = (event.target as HTMLButtonElement).offsetWidth + "px";
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'left', this.navActive.nativeElement.offsetLeft + 'px');
      this.renderer.setStyle(this.productTabMarker.nativeElement, 'width', this.navActive.nativeElement.offsetWidth + 'px');
    }, 0);
  }

  get sanitizedDescription() {
    return this.sanitizer.bypassSecurityTrustHtml(this.product.description);
  }
}
