import {Component, OnDestroy, OnInit} from '@angular/core';
import {VmDirectService} from '../../../service/vm-direct.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../service/common.service';

@Component({
    selector: 'app-vm-direct-detail',
    templateUrl: './vm-direct-detail.component.html',
    styleUrls: ['./vm-direct-detail.component.scss']
})
export class VmDirectDetailComponent implements OnInit, OnDestroy {

    public vm: any;
    public vmXml: string;
    public loading = true;
    public id: string;
    public vmInput = new FormGroup({
        vCPU: new FormControl(),
        memory: new FormControl(),
    });


    constructor(
        private vmDirectService: VmDirectService,
        private route: ActivatedRoute,
        private commonService: CommonService,
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.vmDirectService.get(sessionStorage.getItem('vm-direct'), this.id).then((response) => {
            if (response.status === 200) {
                this.loading = false;
                this.vm = response.data.vm;
                this.vmXml = response.data.xml;
            }
            this.vmInput.patchValue({
                vCPU: this.vm.vm.VCPU.Value,
                memory: this.vm.vm.Memory.Value,
            });
            console.log(response);
        });
    }

    ngOnDestroy() {
        sessionStorage.removeItem('vm-direct');
    }

    update() {
        const json = {
            cpu: this.vmInput.value.vCPU,
            memory: this.vmInput.value.Memory
        };
        console.log(json);
        this.vmDirectService.update(this.id, json).then(response => {
            if (response.status) {
                this.commonService.openBar('OK', 5000);
            } else {
                this.commonService.openBar('NG', 5000);
                console.log('error: ' + JSON.stringify(response));
            }
        });
    }

}
