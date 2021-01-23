import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class NodeService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    create(body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/node',
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    getPCI(uid): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/node/' + uid + '/pci', {
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    getUSB(uid): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/node/' + uid + '/usb', {
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    get(uid): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/node/' + uid, {
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    getAll(): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/node', {
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }

    update(uid, data): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/node/' + uid,
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
                    node: response
                };
            }
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }
}
