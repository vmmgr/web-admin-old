import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VmService {

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
                error: response.error,
                vm: response.vm
            };
        }
    }

    get(nodeID, vmID): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/vm/' + nodeID + '/' + vmID, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    getAll(): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/vm', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    update(nodeID, vmUUID, json: any): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + nodeID + '/' + vmUUID, json, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    powerOn(id, json: any): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + id + '/power', json, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    powerOff(id, json: any): Promise<any> {
        return this.http.request('delete', environment.api.url + environment.api.path + '/vm/' + id + '/power', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: json
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    power(id, json: any): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + id + '/power', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }), json
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }
}
