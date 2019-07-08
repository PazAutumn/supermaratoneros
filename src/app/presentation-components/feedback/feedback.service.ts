import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class FeedbackService {
  constructor(private common: CommonService) { }

  public getSerieInfo(serie): Observable<any> {
  return this.callAPI('s=', serie)
  }

  public callAPI(parameter: string, serie: any): Observable<any> {
    const url = environment.urlApi + '?apikey=bd7a01a9&type=series&' + parameter + serie;
//    console.log(url);
    return this.common.callServiceForGet(url);
  }

}
