import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GeneralOverviewComponent} from '@app/pages/main/general/general-overview/general-overview.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule {
}
