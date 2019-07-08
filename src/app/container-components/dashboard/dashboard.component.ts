import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CommonService } from '../../services/common.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [ DashboardService ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private common: CommonService) { }

  ngOnInit() {
    const randomSeriesArray = ['Stranger Things', 'Bojack', 'Sex Education', 'Tuca & Bertie', 'Malcolm in the middle', 'Rick & Morty','Game of Thrones', 'Narcos', 'Black mirror', 'sense8', 'Breaking Bad', 'Walking Dead', 'Silicon Valley', 'Mindhunter', 'Designated Survivor', 'Scream Queens', 'Dexter', 'Glee', 'Big Bang Theory', 'Modern Family', 'True Blood'];
    randomSeriesArray.map((serie) => {
      this.dashboardService.getSerieInfo(serie)
      .takeUntil(this.unsubscribe$)
      .subscribe(
      (data) => {
        this.getDataOk(data);
        console.log(data);
      },
      (error) => {
        this.getDataNotOk(error);
      });
    })  
    
      
    }

  /**
   * se des-suscribe del elemento
   * @memberof DashboardComponent
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @method mapToClientObject
   * @description procesamiento de respuesta exitosa de BFF inicioAutenticacion
   * @param data
   */
  getDataOk(data) {
    this.common.setSeriePosters(data.Poster);
    this.common.setSeries(data);
    console.log('llamada ok')
  }

  /**
   * @method getDataNotOk
   * @description procesamiento de errores para hacer redirección de feedback
   * @param error
   */
  getDataNotOk(error) {
    console.log('llamada not ok')
  }
}
