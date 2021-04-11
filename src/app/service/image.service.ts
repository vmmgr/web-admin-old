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

    webSocketVM: WebSocket;
    webSocketNoVM: WebSocket;
    dataVMListMessage: any[] = [];
    dataNoVMListMessage: any[] = [];


    public openNoVMListWebSocket() {
        this.webSocketNoVM = new WebSocket(environment.websocket.url + environment.websocket.path + '/storage/no_vm/list');
        this.webSocketNoVM.onopen = (event) => {
            console.log(event);
        };

        this.webSocketNoVM.onmessage = (event) => {
            console.log(event.data);
            const json = JSON.parse(event.data);
            if (json.error === '') {
                this.dataNoVMListMessage.push({
                    nodeID: json.node_id,
                    name: json.name,
                    uuid: json.uuid,
                    filePath: json.file_path,
                    size: json.size,
                    time: json.time,
                    message: json.message
                });
            } else {
                this.commonService.openBar('[NodeID: ' + json.node_id + '] ' + json.error, 10000);
            }
        };

        this.webSocketNoVM.onclose = (event) => {
            this.dataNoVMListMessage = [];
            console.log(event);
        };
    }

    public sendNoVMListWebSocket(message: string) {
        console.log(message);
        this.webSocketNoVM.send(message);
    }

    public closeNoVMListWebSocket() {
        this.dataNoVMListMessage = [];
        this.webSocketNoVM.close();
    }

    public openVMListWebSocket() {
        this.webSocketVM = new WebSocket(environment.websocket.url + environment.websocket.path + '/storage/vm/list');
        this.webSocketVM.onopen = (event) => {
            console.log(event);
        };

        this.webSocketVM.onmessage = (event) => {
            console.log(event.data);
            const json = JSON.parse(event.data);
            if (json.error === '') {
                this.dataVMListMessage.push({
                    nodeID: json.node_id,
                    name: json.name,
                    uuid: json.uuid,
                    filePath: json.file_path,
                    size: json.size,
                    time: json.time,
                    message: json.message
                });
            } else {
                this.commonService.openBar('[NodeID: ' + json.node_id + '] ' + json.error, 10000);
            }
        };

        this.webSocketVM.onclose = (event) => {
            this.dataVMListMessage = [];
            console.log(event);
        };
    }

    public sendVMListWebSocket(message: string) {
        console.log(message);
        this.webSocketVM.send(message);
    }

    public closeVMListWebSocket() {
        this.dataVMListMessage = [];
        this.webSocketVM.close();
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

    createVM(id, body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/storage/' + id + '/vm',
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
