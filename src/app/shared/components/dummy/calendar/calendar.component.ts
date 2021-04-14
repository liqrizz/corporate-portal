import {Component, EventEmitter, Input, Output} from '@angular/core';
import {calendarOptions} from '@shared/configs/primeng-localeSettings';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Output() dateChanged = new EventEmitter<Date>();
  @Input() eventDates: any = {};

  selectedDate: Date;
  oldDate: Date;
  options = calendarOptions;

  constructor() {
    const today = new Date();
    this.selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    this.oldDate = new Date(this.selectedDate);
  }

  onChange(date: Date): void {
    if (date.getMonth() === this.oldDate.getMonth() && date.getDate() === this.oldDate.getDate()) {
      return;
    }
    this.oldDate = date;
    this.dateChanged.emit(date);
  }
}
