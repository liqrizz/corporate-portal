import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MeetingCalendarComponent} from '@app/pages/meeting-calendar/meeting-calendar/meeting-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingCalendarRoutingModule { }
