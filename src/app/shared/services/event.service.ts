import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {rests} from '@shared/services/rests';
import {BehaviorSubject, Observable} from 'rxjs';
import EventGetDto from '@shared/models/event-get-dto';
import {map, tap} from 'rxjs/operators';
import {EventDate} from '@shared/models/event-date';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private selectedDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  public selectedDateEventsHook: BehaviorSubject<{ events: EventGetDto[]; selectedDate: Date }> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getEvents(date: Date): Observable<EventGetDto[]> {
    return this.http.get<EventGetDto[]>(rests.events.events_get_all, {params: {date: date.toISOString()}})
      .pipe(
        tap(x => this.selectedDateEventsHook
          .next({
            events: x,
            selectedDate: this.selectedDateSubject.value
          })
        )
      );
  }

  postEvent(event): Observable<any> {
    return this.http.post(rests.events.events_set, event);
  }

  getEventDates(date: Date): Observable<EventDate[]> {
    return this.http.get<EventDate[]>(rests.events.events_get_dates, {params: {date: date.toISOString()}})
      .pipe(map(m => {
        return m.map(item => ({EventDate: new Date(item.EventDate)}));
      }));
  }

  /* Getter and Setters*/
  getSelectedDate(): BehaviorSubject<Date> {
    return this.selectedDateSubject;
  }

  setDate(value: Date): void {
    this.selectedDateSubject.next(value);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.post(rests.events.events_delete, {}, {params: {id}});
  }
}
