import {Component} from '@angular/core';
import {EnvironmentService} from '@core/services/environment.service';
import {EventService} from '@shared/services/event.service';

@Component({
  selector: 'app-root',
  template: `
    <p-toast position="top-right"></p-toast>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'corporate-portal';

  constructor(private environmentService: EnvironmentService,
              private eventService: EventService) {
    console.log(environmentService.getValue('token'));
  }

}
