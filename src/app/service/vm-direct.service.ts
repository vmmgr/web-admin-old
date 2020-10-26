import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class VmDirectService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    get(uri: string, id): Promise<any> {
        return this.http.get(uri + '/api/v1/vm/' + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            const response: any = r;
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response.status,
                    error: response.error.error,
                    data: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    getAll(uri: string): Promise<any> {
        return this.http.get(uri + '/api/v1/vm', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            const response: any = r;
            if (response.status === 200) {
                return response;
            } else {
                return {
                    status: response.status,
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
