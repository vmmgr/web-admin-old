import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    public router: Router,
    private commonService: CommonService,
    private http: HttpClient
  ) {
  }

  create(body): Promise<any> {
    return this.http.post(environment.api.url + environment.api.path + '/notice',
      body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }),
      }).toPromise().then(r => {
      const response: any = r;
      console.log('response: ' + JSON.stringify(response));
      if (response.status === true) {
        return response;
      } else {
        return {
          status: false,
          error: response.error.error,
          data: response
        };
      }
    }).catch(error => {
      console.log(error);
      return {status: false, error};
    });
  }

  delete(id): Promise<any> {
    return this.http.delete(environment.api.url + environment.api.path + '/notice/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }),
      }).toPromise().then(r => {
      const response: any = r;
      console.log('response: ' + JSON.stringify(response));
      if (response.status === true) {
        return response;
      } else {
        return {
          status: false,
          error: response.error.error,
          data: response
        };
      }
    }).catch(error => {
      console.log(error);
      return {status: false, error};
    });
  }

  get(uid): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/notice/' + uid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      if (response.status === true) {
        return response;
      } else {
        return {
          status: false,
          error: response.error.error,
          data: response
        };
      }
    }).catch(error => {
      console.log(error);
      return {status: false, error};
    });
  }

  getAll(): Promise<any> {
    return this.http.get(environment.api.url + environment.api.path + '/notice', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      if (response.status === true) {
        return response;
      } else {
        return {
          status: false,
          error: response.error.error,
          data: response
        };
      }
    }).catch(error => {
      console.log(error);
      return {status: false, error};
    });
  }

  update(uid, data): Promise<any> {
    return this.http.put(environment.api.url + environment.api.path + '/notice/' + uid,
      data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
        }),
      }).toPromise().then(r => {
      const response: any = r;
      if (response.status === true) {
        return response;
      } else {
        return {
          status: false,
          error: response.error.error,
          data: response
        };
      }
    }).catch(error => {
      console.log(error);
      return {status: false, error};
    });
  }
}

