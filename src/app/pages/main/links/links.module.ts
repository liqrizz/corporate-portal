import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './links/links.component';
import { CreateLinkOverlayComponent } from './links/create-link-overlay/create-link-overlay.component';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [LinksComponent, CreateLinkOverlayComponent],
  imports: [
    CommonModule,
    SharedModule,
    LinksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LinksModule { }
