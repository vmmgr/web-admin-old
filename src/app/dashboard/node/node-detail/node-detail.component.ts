import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NodeService} from '../../../service/node.service';
import {CommonService} from '../../../service/common.service';

@Component({
    selector: 'app-node-detail',
    templateUrl: './node-detail.component.html',
    styleUrls: ['./node-detail.component.scss']
})
export class NodeDetailComponent implements OnInit {

    constructor(
        private nodeService: NodeService,
        private commonService: CommonService,
        private route: ActivatedRoute,
    ) {
    }

    public id: string;
    public loading = true;
    public node: any = [];
    public nodePCI: any = [];
    public nodeUSB: any = [];

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.nodeService.get(this.id).then((response) => {
            if (response.error === null) {
                console.log(response.data);
                this.loading = false;
                this.node = response.data.node[0];
            }
            console.log(response);
        });

        this.nodeService.getAllDevice(this.id).then((response) => {
            if (response.error === null) {
                console.log(response.data);
                this.loading = false;
                this.nodeUSB = response.data.usb;
                this.nodePCI = response.data.pci;
            }
        });
    }
}
