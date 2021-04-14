import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EventService} from '@shared/services/event.service';
import {AuthService} from '@shared/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import EventGetDto from '@shared/models/event-get-dto';
import {MessageService} from 'primeng/api';
import {calendarOptions} from '@shared/configs/primeng-localeSettings';
import {EmployeeService} from '@shared/services/employee.service';
import {SelectUserOverlayComponent} from '@app/pages/meeting-calendar/meeting-calendar/select-user-overlay/select-user-overlay.component';

@Component({
  selector: 'app-create-event-overlay',
  templateUrl: './create-event-overlay.component.html',
  styleUrls: ['./create-event-overlay.component.scss']
})
export class CreateEventOverlayComponent implements OnInit {
  timeRgx = /\d{2}:\d{2}:\d{2}/;
  form: FormGroup;

  options = calendarOptions;
  private readonly userId: any;
  eventId: number;
  private usersSelectedMap = {};
  usersSelectedLength: number;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private eventService: EventService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService
  ) {
    const selectedDate = this.eventService.getSelectedDate().value || new Date();
    this.userId = this.authService.getUser().id;
    this.form = this.fb.group({
      startDate: [selectedDate, [Validators.required]],
      startTime: ['08:00', [Validators.required]],
      endTime: ['09:00', [Validators.required]],
      endDate: [selectedDate, [Validators.required]],
      description: ['', [Validators.required]],
      isImportant: [false]
    });
  }

  ngOnInit(): void {
    this.employeeService.getRefEmployees().subscribe(data => {
      console.log(data);
    });
    if (this.config.data && this.config.data.event) {
      const event = this.config.data.event as EventGetDto;
      this.form.setValue({
        startDate: new Date(event.startTime),
        startTime: this.timeRgx.exec(event.startTime)[0].slice(0, -3),
        endTime: this.timeRgx.exec(event.endTime)[0].slice(0, -3),
        endDate: new Date(event.endTime),
        description: event.description,
        isImportant: event.isImportant
      });
      this.eventId = event.id;
    }
  }

  createEvent(): void {
    const userData = this.form.getRawValue();
    const startDate = new Date(userData.startDate.getTime() - (userData.startDate.getTimezoneOffset() * 60000));
    const endDate = new Date(userData.endDate.getTime() - (userData.startDate.getTimezoneOffset() * 60000));
    if (startDate.getTime() > endDate.getTime()) {
      alert('Дата начала не может быть больше даты окончания!');
      return;
    }

    const startTime = startDate.toISOString().replace(this.timeRgx, userData.startTime + ':00');
    const endTime = endDate.toISOString().replace(this.timeRgx, userData.endTime + ':00');
    const participants = Object.keys(this.usersSelectedMap)
      .filter(f => this.usersSelectedMap[f]).join('|');
    const event: EventGetDto = {
      userId: this.userId,
      startTime,
      endTime,
      description: userData.description,
      isImportant: userData.isImportant
    };

    if (this.eventId) {
      event.id = this.eventId;
    }

    this.eventService.postEvent(event).subscribe(
      _ => {
        const title = event.id ? 'изменено' : 'создано';
        this.messageService.add({severity: 'success', summary: 'Событие успешно ' + title});
        this.eventService.setDate(this.eventService.getSelectedDate().value);
        this.ref.close();
      },
      e => {
        alert(JSON.stringify(e));
      }
    );
  }

  openSelectUsers(): void {
    const dialogRef = this.dialogService.open(SelectUserOverlayComponent, {
      baseZIndex: 100000000000,
      closable: false,
      styleClass: 'selectUser',
      showHeader: false,
      data: {
        usersSelectedMap: this.usersSelectedMap
      },
      contentStyle: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        padding: '0px',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });
    const onCloseSub = dialogRef.onClose.subscribe(res => {
      this.usersSelectedMap = res;
      this.usersSelectedLength = Object.keys(res).filter(f => res[f]).length;
      onCloseSub.unsubscribe();
    });
  }
}
