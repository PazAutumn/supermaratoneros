import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpModule, Response } from '@angular/http';

// Swiper lib
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';
import { DashboardComponent } from './container-components/dashboard/dashboard.component';
import { HeaderComponent } from './presentation-components/header/header.component';
import { LoginComponent } from './presentation-components/login/login.component';
import { CarouselComponent } from './presentation-components/carousel/carousel.component';
import { InformationComponent } from './presentation-components/information/information.component';
import { FooterComponent } from './presentation-components/footer/footer.component';
import { CommonService } from './services/common.service';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 2,
  centeredSlides: true,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    CarouselComponent,
    InformationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    SwiperModule,
    HttpModule,
    HttpClientModule,       
  ],
  providers: [
    CommonService,
    {
      provide: APP_BASE_HREF,
      useValue: '/apps/supermaratoneros',
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule { }
