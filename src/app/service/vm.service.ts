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

    websocket: WebSocket;
    websocketVMCreate: WebSocket;
    progress = 0;
    dataMessage: any[] = [];
    dataMessageVMCreate: any;

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

    public openWebSocket() {
        this.websocket = new WebSocket(environment.websocket.url + environment.websocket.path + '/vm/list');
        this.websocket.onopen = (event) => {
            console.log(event);
        };

        this.websocket.onmessage = (event) => {
            console.log(event.data);
            const json = JSON.parse(event.data);
            if (json.error === '') {
                this.dataMessage.push({
                    nodeID: json.node_id,
                    name: json.name,
                    uuid: json.uuid,
                    vcpu: json.vcpu,
                    memory: json.memory,
                    status: json.status,
                    message: json.message
                });
            } else {
                this.commonService.openBar('[NodeID: ' + json.node_id + '] ' + json.error, 10000);
            }
        };
        this.websocket.onclose = (event) => {
            console.log(event);
        };
    }

    public sendMessage(message: string) {
        console.log(message);
        this.websocket.send(message);
    }

    public closeWebSocket() {
        this.dataMessage = [];
        this.websocket.close();
    }

    public openVMCreateWebSocket() {
        this.websocketVMCreate = new WebSocket(environment.websocket.url + environment.websocket.path + '/vm/create');
        this.websocketVMCreate.onopen = (event) => {
            console.log(event);
        };

        this.websocketVMCreate.onmessage = (event) => {
            // console.log(event);
            const tmp = event.data;
            console.log(tmp);
            this.progress = event.data.progress;
            const json = JSON.parse(event.data);
            this.dataMessageVMCreate = json;
            this.progress = json.progress;
        };
        this.websocketVMCreate.onclose = (event) => {
            console.log(event);
        };
    }

    public sendVMCreateMessage(message: string) {
        console.log(message);
        this.websocketVMCreate.send(message);
    }

    public closeVMCreateWebSocket() {
        this.websocketVMCreate.close();
    }

    create(body): Promise<any> {
        return this.http.post(environment.api.url + environment.api.path + '/vm', body, {
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

    powerOn(nodeID: string, vmUUID: string): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + nodeID + '/' + vmUUID + '/power', null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            this.commonService.openBar(error.error, 10000);
            return {status: false, error};
        });
    }

    powerOff(nodeID: string, vmUUID: string, json: any): Promise<any> {
        return this.http.request('delete', environment.api.url + environment.api.path + '/vm/' +
            nodeID + '/' + vmUUID + '/power', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: json
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            this.commonService.openBar(error.error, 10000);
            return {status: false, error};
        });
    }

    suspend(nodeID: string, vmUUID: string): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + nodeID + '/' + vmUUID + '/suspend', null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }).toPromise().then(r => {
            return VmService.resProcess(r);
        }).catch(error => {
            console.log(error);
            this.commonService.openBar(error.error, 10000);
            return {status: false, error};
        });
    }

    resume(nodeID: string, vmUUID: string): Promise<any> {
        return this.http.put(environment.api.url + environment.api.path + '/vm/' + nodeID + '/' + vmUUID + '/resume', null, {
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
}
