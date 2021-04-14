import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneralRoutingModule} from './general-routing.module';
import {GeneralOverviewComponent} from './general-overview/general-overview.component';
import {TableModule} from 'primeng/table';
import {SharedModule} from '@shared/shared.module';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [GeneralOverviewComponent],
    imports: [
        GeneralRoutingModule,
        CommonModule,
        TableModule,
        SharedModule,
        DynamicDialogModule,
        ReactiveFormsModule
    ], providers: [DialogService]
})
export class GeneralModule {
}
