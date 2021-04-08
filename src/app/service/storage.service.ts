import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    websocketVMCreate: WebSocket;
    downloadProgress = 0;
    downloadName = '';
    downloadMessage = '';
    dataMessageVMCreate: any;

    constructor(
        public router: Router,
        private commonService: CommonService,
        private http: HttpClient
    ) {
    }

    public openStorageProgressWebSocket() {
        this.websocketVMCreate = new WebSocket(environment.websocket.url + environment.websocket.path + '/storage/progress');
        this.websocketVMCreate.onopen = (event) => {
            console.log(event);
        };

        this.websocketVMCreate.onmessage = (event) => {
            // console.log(event);
            const tmp = event.data;
            console.log(tmp);
            this.downloadProgress = event.data.progress;
            const json = JSON.parse(event.data);
            this.dataMessageVMCreate = json;
            this.downloadProgress = json.progress;
            this.downloadName = json.name;
            this.downloadMessage = json.message;
        };
        this.websocketVMCreate.onclose = (event) => {
            console.log(event);
        };
    }

    public sendStorageMessage(message: string) {
        console.log(message);
        this.websocketVMCreate.send(message);
    }

    public closeStorageWebSocket() {
        this.websocketVMCreate.close();
    }

    get(): Promise<any> {
        return this.http.get(environment.api.url + environment.api.path + '/storage', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return r;
        }).catch(error => {
            console.log(error);
            // return {status: false, error};
        });
    }
}
