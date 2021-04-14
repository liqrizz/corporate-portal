import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {RightSideComponent} from '@app/layouts/right-side/right-side.component';
import {SharedModule} from '@shared/shared.module';
import {MainMenuComponent} from '@app/layouts/main-menu/main-menu.component';
import {SidebarComponent} from '@app/layouts/sidebar/sidebar.component';


@NgModule({
  declarations: [PagesComponent, RightSideComponent, MainMenuComponent, SidebarComponent],
  exports: [
    RightSideComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
