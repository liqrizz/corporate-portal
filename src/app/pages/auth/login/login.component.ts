import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any;
  password: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  // loginToSystem(): void {
  //   this.authService.login({login, password});
  // }
}
