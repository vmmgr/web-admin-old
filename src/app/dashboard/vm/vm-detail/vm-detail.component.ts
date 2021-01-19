import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {VmService} from '../../../service/vm.service';
import {log} from 'util';

@Component({
    selector: 'app-vm-detail',
    templateUrl: './vm-detail.component.html',
    styleUrls: ['./vm-detail.component.scss']
})
export class VmDetailComponent implements OnInit {

    public vm: any;
    public status: number;
    public loading = true;
    public nodeID: string;
    public vmID: string;
    public json: string;
    public vncPort: number;
    public webSocketPort: number;
    public vmInput = new FormGroup({
        vCPU: new FormControl(),
        memory: new FormControl(),
    });


    constructor(
        private vmService: VmService,
        private route: ActivatedRoute,
        private commonService: CommonService,
    ) {
    }

    ngOnInit(): void {
        this.nodeID = this.route.snapshot.paramMap.get('node_id');
        this.vmID = this.route.snapshot.paramMap.get('vm_id');
        this.vmService.get(this.nodeID, this.vmID).then((response) => {
            if (response.status === 200) {
                this.loading = false;
                this.vm = response.vm.vm;
                this.status = response.vm.stat;
                this.json = JSON.stringify(response.vm.vm, null, '\t');
                console.log(this.status);
                if (this.vm.Devices.Graphics !== null) {
                    console.log(this.vm.Devices.Graphics[0].VNC.Port);
                    console.log(this.vm.Devices.Graphics[0].VNC.WebSocket);
                    this.vncPort = this.vm.Devices.Graphics[0].VNC.Port;
                    this.webSocketPort = this.vm.Devices.Graphics[0].VNC.WebSocket;
                }

            }
            this.vmInput.patchValue({
                vCPU: this.vm.VCPU.Value,
                memory: this.vm.Memory.Value,
            });
            console.log(response);
        });
    }

    update() {
        const json = {
            cpu: this.vmInput.value.vCPU,
            memory: this.vmInput.value.Memory
        };
        console.log(json);
        this.vmService.update(this.nodeID, this.vmID, json).then(response => {
            if (response.status) {
                this.commonService.openBar('OK', 5000);
            } else {
                this.commonService.openBar('NG', 5000);
                console.log('error: ' + JSON.stringify(response));
            }
        });
    }
}
