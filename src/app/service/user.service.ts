import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    create(body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/user',
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

    get(uid): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/user/' + uid, {
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
        return this.http.get(environment.api.url + environment.api.path + '/user', {
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
        return this.http.put(environment.api.url + environment.api.path + '/user/' + uid,
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
