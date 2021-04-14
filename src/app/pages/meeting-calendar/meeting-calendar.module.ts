import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingCalendarRoutingModule } from './meeting-calendar-routing.module';
import { MeetingCalendarComponent } from './meeting-calendar/meeting-calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SharedModule} from '@shared/shared.module';
import { CreateEventOverlayComponent } from './meeting-calendar/create-event-overlay/create-event-overlay.component';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import { SelectUserOverlayComponent } from './meeting-calendar/select-user-overlay/select-user-overlay.component';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [MeetingCalendarComponent, CreateEventOverlayComponent, SelectUserOverlayComponent],
    imports: [
        CommonModule,
        MeetingCalendarRoutingModule,
        FullCalendarModule,
        SharedModule,
        CalendarModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        ReactiveFormsModule,
        DialogModule
    ]
})
export class MeetingCalendarModule { }
