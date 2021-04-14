import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from '@core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import {environment} from '@environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {Toast, ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api'; // a plugin

registerLocaleData(localeRu, 'ru');

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    ToastModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    Toast,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authService: AuthService) {
    if (!environment.production) {
      this.authService.login('1', '1').subscribe((res) => {
        console.log('RRR ', res);
      });
    }
  }
}
