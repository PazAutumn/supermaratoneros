import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() posters: any;
  /* Carousel vars */
  public show = true;
  public type= 'component';
  public disabled = false;
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    /* slidesPerView Controla el ancho de la tarjeta */
    slidesPerView: 1.23,
    keyboard: true,
    spaceBetween: 4,
    centeredSlides: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    slidesOffsetBefore: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor() { }

  ngOnInit() {
  }

}
