import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    private static resProcess(res: any): any {
        const response: any = res;
        if (response.status === 200) {
            return {
                status: true,
                error: response.error,
                root: response.root
            };
        } else {
            return {
                error: response.error,
                root: response.root
            };
        }
    }

    get(): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/template', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return TemplateService.resProcess(r);
        }).catch(error => {
            console.log(error);
            return {status: false, error};
        });
    }
}
