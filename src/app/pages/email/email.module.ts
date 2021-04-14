import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmailRoutingModule} from './email-routing.module';
import {EmailOverviewComponent} from './email-overview/email-overview.component';


@NgModule({
  declarations: [EmailOverviewComponent],
  imports: [
    CommonModule,
    EmailRoutingModule
  ]
})
export class EmailModule {
}
