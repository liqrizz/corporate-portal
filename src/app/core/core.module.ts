import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ENVIRONMENT} from '@core/services/environment.service';
import {environment} from '@environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: ENVIRONMENT, useValue: environment}
  ]
})
export class CoreModule {
}
