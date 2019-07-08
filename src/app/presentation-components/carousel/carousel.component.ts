import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { CommonService } from '../../services/common.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  @ViewChild('feedback') feedback;
  @ViewChild('modalContent') modalContent;
  @ViewChild('modal') modal;
  @Input() posters: any;
  currentSerie: object;
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
    slidesOffsetBefore: 0,
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
      this.posters = this.common.getSeries();
      console.log(this.posters);
  }

  information(poster) {
    this.modal.toggleModal();
    this.modalContent.title_modal = poster.Title;
    this.modalContent.currentSerie = poster;
    this.modalContent.typeDisplay = 'modal';
  }

  closeModal() {
    this.modal.toggleModal();
  }

}
