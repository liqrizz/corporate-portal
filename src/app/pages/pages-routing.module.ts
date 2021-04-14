import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from '@app/pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      },
      {
        path: 'meeting-calendar',
        loadChildren: () => import('./meeting-calendar/meeting-calendar.module').then(m => m.MeetingCalendarModule),
      },
      {
        path: '',
        redirectTo: 'main'
      },
      {
        path: 'email',
        loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
