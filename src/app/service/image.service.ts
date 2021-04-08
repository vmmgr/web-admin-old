import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    createCDROM(id, body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/storage/' + id + '/cdrom',
            body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    ACCESS_TOKEN: sessionStorage.getItem('AccessToken'),
                }),
            }).toPromise().then(r => {
            const response: any = r;
            return response;
        }).catch(error => {
            console.log(error);
            this.commonService.openBar(error.error.error, 5000);
        });
    }
}
