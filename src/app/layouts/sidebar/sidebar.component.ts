import {Component, EventEmitter, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() titleChanged: EventEmitter<string> = new EventEmitter();

  menu = [
    {
      header: 'Главная',
      link: '/main',
      iconClass: 'ak ak-a-kor'
    },
    {
      header: 'Календарь совещаний',
      link: '/meeting-calendar',
      iconClass: 'ak ak-success-calendar'
    },
    {
      header: 'Почта',
      link: '/email',
      iconClass: 'ak ak-mail'
    }
  ];
  activeLink: string = this.menu[0].link;
  userName: string;


  constructor(private router: Router,
              private authService: AuthService) {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.activeLink = this.menu.find(f => this.router.url.includes(f.link)).link;
      }
    });
    const userInfo = this.authService.getUser();
    this.userName = `${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`;
  }

  emmitPage(event): void {
    this.activeLink = event.link;
    this.titleChanged.emit(event.header);
  }
}
