import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';


@Component({
  selector: 'app-hero-banner-one',
  templateUrl: './hero-banner-one.component.html',
  styleUrls: ['./hero-banner-one.component.scss'],
})
export class HeroBannerOneComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  public swiperInstance: Swiper | undefined;
  public swiperIndex: number = 0;

  public HomeSliderData = [
    {
      id: 1,
      pre_title: { text: 'A partir de', price: 70 },
      title: 'La mejor colección de sorpresas',
      subtitle: {
        text_1: 'Exclusive offer ',
        percent: 35,
        text_2: 'off this week',
      },
      img: '/assets/img/slider/peluche_alianza.png',
      green_bg: true,
    },
    {
      id: 2,
      pre_title: { text: 'A partir de', price: 40 },
      title: 'Billeteras para damas al mejor precio',
      subtitle: {
        text_1: 'Exclusive offer ',
        percent: 10,
        text_2: 'off this week',
      },
      img: '/assets/img/slider/billetera.png',
      is_light: true,
    },
    {
      id: 3,
      pre_title: { text: 'A partir de', price: 60 },
      title: 'La mejor colección para la casa',
      subtitle: {
        text_1: 'Exclusive offer ',
        percent: 10,
        text_2: 'off this week',
      },
      img: '/assets/img/slider/set_jarras.png',
      green_bg: true,
    },
  ];

  ngAfterViewInit() {
    if (this.swiperContainer) {
      this.swiperInstance = new Swiper('.tp-slider-active', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        effect: 'fade',
        modules: [EffectFade, Pagination],
        pagination: {
          el: '.tp-slider-dot',
          clickable: true,
        },
        on: {
          slideChange: () => {
            this.swiperIndex = this.swiperInstance?.realIndex || 0;
          },
        },
      });
    }
  }
}
