import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `CrimeWebAPI/User/Login?username=${username}&password=${password}`,
        {},
        {observe: 'response'}
      )
      .pipe(
        map((res) => {
          if (res.status === 200) {
            localStorage.setItem('__anticorCurrentUser', JSON.stringify(res.body));
          }
          this.currentUser.next(res.body);
          return res;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post('/CrimeWebAPI/User/Logout', {}, {observe: 'response', responseType: 'text' as 'json'});
  }

  getUser(): any {
    try {
      return JSON.parse(localStorage.getItem('__anticorCurrentUser'));
    } catch (e) {
      console.error('Не удалось получить объект из localstorage по ключу __anticorCurrentUser', e);
      return {};
    }
  }
}
