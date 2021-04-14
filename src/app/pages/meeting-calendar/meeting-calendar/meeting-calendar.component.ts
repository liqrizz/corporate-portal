import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocales from '@fullcalendar/core/locales/ru';
import {CalendarOptions, EventContentArg, FullCalendarComponent} from '@fullcalendar/angular';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CreateEventOverlayComponent} from './create-event-overlay/create-event-overlay.component';
import {EventService} from '@shared/services/event.service';
import {Subscription} from 'rxjs';
import EventGetDto from '@shared/models/event-get-dto';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-meeting-calendar',
  templateUrl: './meeting-calendar.component.html',
  styleUrls: ['./meeting-calendar.component.scss'],
  providers: [DialogService]
})
export class MeetingCalendarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('template') template: TemplateRef<any>;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  timeRgx = /\d{2}:\d{2}:\d{2}/;
  headerDate = new Date();
  private ref: DynamicDialogRef;
  private subscription: Subscription;
  private timeout: any;
  private oldEl: { bgColor: any; el: any; zIndex: number };
  private rawEvents: EventGetDto[];
  displayBasic: boolean;
  dialogHeader: string;
  evenText: string;

  constructor(
    private cd: ChangeDetectorRef,
    private eventService: EventService,
    public dialogService: DialogService
  ) {
    this.calendarOptions = {
      initialView: 'timeGridDay',
      initialDate: new Date(),
      height: '100%',
      locale: ruLocales,
      headerToolbar: false,
      dayHeaders: false,
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      eventClick: (e: any) => {
        this.reset();
        this.oldEl = {
          el: e.el,
          zIndex: e.el.parentElement.style.zIndex,
          bgColor: e.el.style.backgroundColor
        };
        e.el.parentElement.style.zIndex = 9999;
        e.el.style.backgroundColor = e.el.style.backgroundColor.replace(/0\.\d/, '0.7');
      },
      eventContent: this.eventContent.bind(this),

      allDayText: 'Время',
      slotMinTime: '08:00',
      slotMaxTime: '20:00',
      plugins: [dayGridPlugin, timeGridPlugin]
    };
  }

  ngAfterViewInit(): void {
    this.subscription = this.eventService.selectedDateEventsHook
      .pipe(
        filter(x => x !== null)
      )
      .subscribe(EventData => {
        this.rawEvents = EventData.events;
        this.calendarOptions.events = this.eventMapper(EventData.events);
        this.headerDate = EventData.selectedDate;
        this.calendarComponent.getApi().gotoDate(EventData.selectedDate);
      });
  }

  eventContent({event}: EventContentArg): {domNodes: any[]} {
    const startTime = this.timeRgx.exec(event.startStr)[0].slice(0, -3);
    const endTime = this.timeRgx.exec(event.endStr)[0].slice(0, -3);
    const timeText = `${startTime} - ${endTime}`;
    const customEvent = {
      id: event.id,
      title: event.title,
      time: timeText,
      isUrgent: event.backgroundColor === EventStatus.URGENT
    };

    this.eventWidthNormalizer();

    const embeddedViewRef1 = this.container.createEmbeddedView(this.template, customEvent);
    this.cd.detectChanges();
    return {domNodes: embeddedViewRef1.rootNodes};
  }

  private eventWidthNormalizer(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      const eventContainer = document.querySelector('.fc-timegrid-col-events');
      const eventChildren = Array.from(eventContainer.children);
      eventChildren.forEach((item: any, index, arr: any[]) => {
        if (index === arr.length - 1) {
          item.style.right = 0;
          return;
        }

        const lookToNextItemLeftPosition = Number(arr[index + 1].style.left.replace(/(%|px)/, ''));
        const currentBottom = Math.abs(item.style.bottom.replace(/(%|px)/, ''));
        const futureTop =  Number(arr[index + 1].style.top.replace(/(%|px)/, ''));
        const inParallelLine = futureTop >= currentBottom;

        if (lookToNextItemLeftPosition > 0 && !inParallelLine) {
          item.style.right = (100 - lookToNextItemLeftPosition) + '%';
          item.style.marginRight = 3 + 'px';
        } else {
          item.style.right = 0;
        }
      });
    });
  }

  reset(): void {
    if (this.oldEl) {
      this.oldEl.el.style.backgroundColor = this.oldEl.bgColor;
      this.oldEl.el.parentElement.style.zIndex = this.oldEl.zIndex;
      this.oldEl = null;
    }
  }

  showBasicDialog(header, eventTitle): void {
    this.dialogHeader = header;
    this.evenText = eventTitle;
    this.displayBasic = true;
  }

  createEvent(event?: EventGetDto): void {
    this.ref = this.dialogService.open(CreateEventOverlayComponent, {
      baseZIndex: 10000,
      closable: false,
      showHeader: false,
      data: event ? {event} : null,
      contentStyle: {
        padding: '0px',
        borderRadius: '5px'
      }
    });
  }

  eventMapper(events: EventGetDto[]): CalendarData[] {
    if (events.length === 0) {
      return [];
    }

    const timeNow = Date.now();

    return events.map(x => ({
      title: x.description,
      className: 'custom-event',
      textColor: '#000',
      date: new Date(x.startTime),
      end: new Date(x.endTime),
      color: new Date(x.endTime).getTime() < timeNow ? EventStatus.URGENT : EventStatus.INFO,
      id: String(x.id)
    }));
  }

  deleteEvent(id: string): void {
    if (!confirm('Вы точно хотите удалить событие')) {
      return;
    }
    this.eventService.deleteEvent(id).subscribe(() => {
      this.eventService.setDate(this.eventService.getSelectedDate().value);
    });
  }

  editEvent(id: string): void {
    const currentEvent = this.rawEvents.find(e => e.id === Number(id));
    this.createEvent(currentEvent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

enum EventStatus {
  INFO = 'rgba(171, 223, 236, 0.3)',
  URGENT = 'rgba(255, 209, 209, 0.45)'
}

interface CalendarData {
  title: string;
  date: Date;
  end: Date;
  color: EventStatus;
  textColor: '#000';
  className: string;
  id: string;
}


interface LinkedData {
  lifeTime: number;
  sumOfTimes: number;
  child: LinkedData;
}
