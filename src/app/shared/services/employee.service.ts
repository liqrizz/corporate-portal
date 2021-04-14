import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {rests} from '@shared/services/rests';
import {GetEmployees, Stat} from '@shared/models/employees';
import {tap} from 'rxjs/operators';
import {EmployeeFilter} from '@shared/filters/employee-filter';
import {prepareFilter} from '@core/util/prepareFilter';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  prevStats = new BehaviorSubject<Stat[]>(null);

  constructor(private http: HttpClient) {
  }

  statList(): Observable<Stat[]> {
    return this.http.get<Stat[]>(rests.stat)
      .pipe(
        tap(x => this.prevStats.next(x))
      );
  }

  getEmployees(filter: EmployeeFilter): Observable<GetEmployees> {
    const params = prepareFilter(filter);
    return this.http.get<GetEmployees>(rests.employee.employee_get, {params});
  }

  getRefEmployees(): Observable<any> {
    return this.http.get(rests.employee.employee_reference);
  }
}
