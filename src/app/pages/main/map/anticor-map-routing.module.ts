import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from '@app/pages/main/map/map/map.component';
import {EmployeesListByRegionComponent} from '@app/pages/main/map/employess-list-by-region/employees-list-by-region.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'employees/:id',
    component: EmployeesListByRegionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnticorMapRoutingModule { }
