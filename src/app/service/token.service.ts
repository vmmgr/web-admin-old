import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(
    public router: Router,
    private commonService: CommonService,
    private http: HttpClient
  ) {
  }

  create(body): Promise<any> {
    return this.http.post(environment.api.url + environment.api.path + '/token',
        body, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
          }),
        }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }

  delete(id): Promise<any> {
    return this.http.delete(environment.api.url + environment.api.path + '/token/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }

  deleteAll(): Promise<any> {
    return this.http.delete(environment.api.url + environment.api.path + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      // this.router.navigate(['/error']).then();
    });
  }

  get(uid): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/token/' + uid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }

  getAll(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      return {data: r, error: null};
    }).catch(error => {
      console.log(error);
      return {error: error.error};
    });
  }

  update(uid, data): Promise<any> {
    return this.http.put(environment.api.url + environment.api.path + '/token/' + uid,
        data, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
          }),
        }).toPromise().then(r => {
      const response: any = r;
      return response;
    }).catch(error => {
      sessionStorage.setItem('error', JSON.stringify(error));
      this.router.navigate(['/error']).then();
    });
  }
}
