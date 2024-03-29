import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    create(body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/group',
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
                    group: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    get(uid): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/group/' + uid, {
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

    getAll(): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/group', {
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
        return this.http.put(environment.api.url + environment.api.path + '/group/' + uid,
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
                    group: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }
}
