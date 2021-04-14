import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map'
  },
  {
    path: 'map',
    loadChildren: () => import('./map/anticor-map.module').then(m => m.AnticorMapModule)
  },
  {
    path: 'links',
    loadChildren: () => import('./links/links.module').then(m => m.LinksModule)
  },
  {
    path: 'general',
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
