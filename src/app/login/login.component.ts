import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {FormControl} from '@angular/forms';
import {CommonService} from '../service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {
  }

  public hide = true;
  public user = new FormControl();
  public password = new FormControl();


  ngOnInit(): void {
  }

  login() {
    // if (this.user.value === '' && this.password.value === '') {
    //   this.commonService.openBar('ユーザ又はパスワードが空です。', 5000);
    // }
    this.authService.login(this.user.value, this.password.value);
  }
}
