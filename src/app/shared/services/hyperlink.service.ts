import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rests} from '@shared/services/rests';
import {EnvironmentService} from '@core/services/environment.service';
import {Observable} from 'rxjs';
import {HyperlinkSet} from '@shared/models/hyperlink-set';
import {HyperlinkGet} from '@shared/models/hyperlink-get';

@Injectable({
  providedIn: 'root'
})
export class HyperlinkService {
  private readonly url: string;

  constructor(private http: HttpClient,
              private environment: EnvironmentService) {
    this.url = environment.getValue('apiUrl');
  }

  getLinks(): Observable<HyperlinkGet[]> {
    return this.http.get<HyperlinkGet[]>(rests.hyperlink.hyperlink_list);
  }

  setLink(toSave: HyperlinkSet): Observable<any> {
    return this.http.post(rests.hyperlink.hyperlink_set, toSave);
  }

  deleteLink(id: any): Observable<any> {
    return this.http.post(rests.hyperlink.hyperlink_delete, {}, {params: {id}});
  }
}
