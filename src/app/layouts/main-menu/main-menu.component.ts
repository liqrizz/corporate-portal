import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnDestroy {
  readonly mainUrl = '/main/map';
  menuItems = [
    {
      url: this.mainUrl,
      iconClass: 'ak ak-a-kor',
      title: ''
    },
    {
      url: '/main/general',
      iconClass: 'ak ak-files',
      title: 'Общая'
    },
    {
      url: '/main/media',
      iconClass: 'ak ak-camera',
      title: 'Фото/видео'
    },
    {
      url: '/main/links',
      iconClass: 'ak ak-link',
      title: 'Ссылки'
    }
  ];
  active = '/';
  private readonly subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.active = null;
        this.menuItems.some(item => {
          const condition = location.pathname.includes(item.url);

          if (condition) {
            this.active = item.url;
          }

          return condition;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
