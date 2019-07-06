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
  posters: any;

  constructor(
    private dashboardService: DashboardService,
    private common: CommonService) { }

  ngOnInit() {
    const randomMovieArray = ['Stranger Things', 'Game of Thrones', 'Narcos', 'Black mirror', 'sense8', 'Breaking Bad', 'Walking Dead', 'Silicon Valley', 'Mindhunter', 'Designated Survivor', 'Scream Queens', 'Dexter', 'Glee', 'Big Bang Theory', 'Modern Family', 'True Blood'];
    this.dashboardService.callAPI('s=', encodeURI(randomMovieArray[2]))
    .takeUntil(this.unsubscribe$)
    .subscribe(
    (data) => {
      this.posters = data.Poster;
      this.getDataOk(data.payload);
    },
    (error) => {
      this.getDataNotOk(error);
    });
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
