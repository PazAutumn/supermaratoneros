import { Injectable } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(private common: CommonService) { }

  public callAPI(parameter: string, serie: any): Observable<any> {
    const url = environment.urlApi + '?apikey=bd7a01a9&' + parameter + serie;
    console.log(url);
    return this.common.callServiceForGet(url);
  }

}
