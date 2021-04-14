import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryOverviewComponent} from '@app/pages/main/gallery/gallery-overview/gallery-overview.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
