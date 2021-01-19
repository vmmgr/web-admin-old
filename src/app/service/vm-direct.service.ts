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

    private static resProcess(res: any): any {
        const response: any = res;
        if (response.status === 200) {
            return response;
        } else {
            return {
                status: response.status,
                error: response.error.error,
                data: response
            };
        }
    }

    get(uri: string, id): Promise<any> {
        return this.http.get(uri + '/api/v1/vm/' + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmDirectService.resProcess(r);
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
            return VmDirectService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    update(uri, json: any): Promise<any> {
        return this.http.put(uri + '/api/v1/vm', json, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmDirectService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    powerOn(uri, id, json: any): Promise<any> {
        return this.http.put(uri + '/api/v1/vm/' + id + '/power', json, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmDirectService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    powerOff(uri, id, json: any): Promise<any> {
        return this.http.request('delete', uri + '/api/v1/vm/' + id + '/power', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: json
        }).toPromise().then(r => {
            return VmDirectService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    power(uri, id, json: any): Promise<any> {
        return this.http.put(uri + '/api/v1/vm/' + id + '/power', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), json
        }).toPromise().then(r => {
            return VmDirectService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }
}
