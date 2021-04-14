import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {GalleryOverviewComponent} from './gallery-overview/gallery-overview.component';
import {SharedModule} from '@shared/shared.module';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';


@NgModule({
  declarations: [GalleryOverviewComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    DynamicDialogModule
  ], providers: [DialogService]
})
export class GalleryModule {
}
