import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnticorMapRoutingModule } from './anticor-map-routing.module';
import { MapComponent } from './map/map.component';
import { EmployeesListByRegionComponent } from './employess-list-by-region/employees-list-by-region.component';
import { SharedModule } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { SemanticPipe } from './employess-list-by-region/semantic.pipe';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MapComponent, EmployeesListByRegionComponent, SemanticPipe],
    imports: [
        CommonModule,
        AnticorMapRoutingModule,
        SharedModule,
        TableModule,
        ReactiveFormsModule
    ]
})
export class AnticorMapModule { }
