import {Component} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-pages',
  template: `
    <div class="container">
      <app-sidebar (titleChanged)="title = $event"></app-sidebar>
      <div class="body">
        <header>
          <h1>{{title}}</h1>
          <a (click)="exit()" target="_self"><img src="assets/img/logout.svg" alt=""></a>
        </header>
        <div style="display: flex">
          <div class="body-content-wrapper">
            <app-main-menu></app-main-menu>
            <div class="body-content">
              <router-outlet></router-outlet>
            </div>
          </div>
          <div class="right-side calendar">
            <app-right-side></app-right-side
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  title = 'Главная';

  constructor(private authService: AuthService) {
  }

  exit(): void {
    this.authService.logout().subscribe((res) => {
      if (res.status === 200) {
        localStorage.removeItem('__anticorCurrentUser');
        window.location.href = '/';
      }
    });
  }
}
