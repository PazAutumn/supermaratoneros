import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { CommonService } from '../../services/common.service';

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
    slidesPerView: 4,
    speed: 100,
    autoplay: true,
    setWrapperSize: true,
    init: true,
    keyboard: true,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    mousewheel: true,
    scrollbar: false,
    slidesOffsetBefore: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor(private common: CommonService) { }

  ngOnInit() {
      this.posters = this.common.getSeriePosters();
  }

}
