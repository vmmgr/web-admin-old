import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(
    public router: Router,
    private userService: UserService,
    private commonService: CommonService,
    http: HttpClient
  ) {
    this.http = http;
  }

  login(user: string, pass: string): void {
    this.http.post(environment.api.url + environment.api.path + '/token/generate', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        USER: user,
        PASS: pass
      }),
    }).toPromise().then(r => {
      const response: any = r;
      console.log(response);
      if (response.status) {
        sessionStorage.setItem('AccessToken', response.token[0].access_token);
        this.router.navigate(['/dashboard']).then();
      } else {
        this.commonService.openBar(response.error, 4000);
      }
    }).catch(error => {
      console.log('error: ' + JSON.stringify(error.error.error));
      this.commonService.openBar(JSON.stringify(error.error.error), 5000);
    });
  }

  logOut(): void {
    this.http.delete(environment.api.url + environment.api.path + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      console.log('response: ' + JSON.stringify(response));
      sessionStorage.clear();
      this.router.navigate(['/']).then();
    }).catch(error => console.log(error));
  }
}
