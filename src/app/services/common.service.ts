import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
    /**Mapeo de los datos*/
    private map: Map<string, any>;
    /**Nombre del error*/
    private errorKey: String;
    /**Código del error*/
    private errorCode: String;
    public posters = Array<string>();
  /**
   * Crea una instancia de CommonFunctionsService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof CommonFunctionsService
   */
  constructor(private http: HttpClient, private router: Router) {
    this.map = new Map<string, any>();
    this.errorCode = '';
    this.errorKey = '';
  }

  public setSeriePosters(poster) {
    this.posters.push(poster);
    return this.posters;
  }

  public getSeriePosters(){
    console.log(this.posters)
    return this.posters;
  }

  /**
   * @method handleServerError
   * @description método genérico para manejar salidas de error del BFF
   * @param url
   * @param header
   * @param body
   */
  handleServerError(error: any | any): Observable<any> {
    if (error.name === 'TimeoutError') {
      return Observable.throw({ message: '002' });
    }
    return Observable.throw({ message: error.error });
  }

  /**
   * @method setErrorCode
   * @description función que disponibiliza el codigo del error para toda la aplicación
   * @param errorCode
   */
  public setErrorCode(errorCode: String): void {
    this.errorCode = errorCode;
  }
  /**
   * @method getErrorCode
   * @description función que recupera el codigo de error
   */
  public getErrorCode(): String {
    return this.errorCode;
  }

  /**
   * @method callServiceForGet
   * @description metodo generico para llamadas de servicio de tipo get
   * @param url
   * @param header
   * @param body
   */
  public callServiceForGet(url): Observable<any> {
    return this.http.get(url)
      .pipe(
      timeout(environment.timeout),
      catchError(this.handleServerError)
      );
  }

  /**
   * @method setErrorKey
   * @description función que disponibiliza el nombre del error para poder buscarlo en el JSON de errores
   * @param errorKey
   */
  public setErrorKey(errorKey: string): void {
    this.errorKey = errorKey;
  }
  /**
   * @method getErrorKey
   * @description función que obtiene el error desde el JSON de errores
   */
  public getErrorKey(): String {
    return this.errorKey;
  }

  /**
   * @method redirectURL
   * @description función que redirecciona el aplicativo
   * @param url
   */
  public redirectURL(url): void {
    this.router.navigateByUrl(url);
  }

}
