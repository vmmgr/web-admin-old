import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VmService} from '../../../service/vm.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {TemplateService} from '../../../service/template.service';
import {NodeService} from '../../../service/node.service';

@Component({
    selector: 'app-vm-create',
    templateUrl: './vm-create.component.html',
    styleUrls: ['./vm-create.component.scss']
})
export class VmCreateComponent implements OnInit, OnDestroy {
    public templates: any;
    public plans: any;
    public selectPlanID: number;
    public selectTemplateID: number;
    public nodes: any;
    public selectNode: any;
    public vmInput = new FormGroup({
        vCPU: new FormControl(),
        memory: new FormControl(),
    });
    public templateInput = new FormGroup({
        name: new FormControl(),
        storage_capacity: new FormControl(),
        storage_path_type: new FormControl(),
        nic_type: new FormControl(),
        ip: new FormControl(),
        netmask: new FormControl(),
        gateway: new FormControl(),
        dns: new FormControl(),
        password: new FormControl(),
        pci: new FormControl(),
        usb: new FormControl(),
    });


    constructor(
        public vmService: VmService,
        private templateService: TemplateService,
        private nodeService: NodeService,
        private route: ActivatedRoute,
        private commonService: CommonService,
    ) {
    }

    ngOnInit(): void {
        this.vmService.openWebSocket();
        this.templateService.get().then((response) => {
            if (response.error === null) {
                this.templates = response.root.template;
                console.log(response);
            }
        });
        this.nodeService.getAll().then((response) => {
            if (response.status) {
                this.nodes = response.node;
                console.log(this.nodes);
                this.commonService.openBar('OK', 5000);
            } else {
                console.log('error: ' + JSON.stringify(response));
                return;
            }
        });
    }

    ngOnDestroy() {
        this.vmService.closeWebSocket();
    }

    templateSelect(id, templateID: number): void {
        this.plans = null;
        this.selectTemplateID = null;
        this.plans = this.templates[id].plan;
        this.selectTemplateID = templateID;
    }

    nodeSelect(id): void {
        this.selectNode = null;
        this.selectNode = id;
    }

    createClick(): void {
        const template = this.templateInput.getRawValue();
        template.node_id = this.selectNode;
        template.template_id = this.selectTemplateID;
        template.template_plan_id = this.selectPlanID;
        try {
            const pci = this.templateInput.get('pci').value;
            template.pci = pci.split(',');
        } catch (e) {
            console.log(e);
        }
        try {
            const usb = this.templateInput.get('usb').value;
            template.usb = usb.split(',');
        } catch (e) {
            console.log(e);
        }

        const body = {node_id: this.selectNode, template, template_apply: true};

        console.log(body);

        this.vmService.create(body).then(response => {
            console.log(response);
        });
    }

    manualCreate() {
    }
}
