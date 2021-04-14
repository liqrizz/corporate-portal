import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '@shared/services/event.service';
import {filter, switchMap} from 'rxjs/operators';
import EventGetDto from '@shared/models/event-get-dto';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.scss']
})
export class RightSideComponent implements OnInit, OnDestroy {
  date = Date;
  timeNow = 0;
  events: EventGetDto[];
  private subscription: Subscription;
  eventDatesMap: any = {};

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  ngOnInit(): void {
    this.onDateChanged(new Date());
  }

  onDateChanged(event: Date): void {
    const day = new Date(event.getFullYear(), event.getMonth(), event.getDate());
    const month = new Date(event.getUTCFullYear(), event.getUTCMonth());
    this.eventService.getEventDates(month).subscribe(res => {
      this.timeNow = Date.now();
      this.eventDatesMap = res.reduce((acc, curr) => {
        const eventDay = `${curr.EventDate.getDate()}-${curr.EventDate.getMonth()}-${curr.EventDate.getFullYear()}`;
        acc[eventDay] = true;
        return acc;
      }, {});
    });
    this.eventService.setDate(day);
  }

  private loadEvents(): void {
    this.eventService.getSelectedDate()
      .pipe(
        filter(date => !!date),
        switchMap(date => this.eventService.getEvents(new Date(date))))
      .subscribe(events => {
        this.events = events;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
