import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {VmService} from '../../service/vm.service';

@Component({
    selector: 'app-vm',
    templateUrl: './vm.component.html',
    styleUrls: ['./vm.component.scss']
})
export class VmComponent implements OnInit {
    public vms: any[] = new Array();

    constructor(
        public vmService: VmService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.vmService.getAll().then((response) => {
            if (response.status === 200) {
                this.vms = response.vm;
            }
            console.log(response);
            console.log(this.vms);
        });
    }

    detailPage(nodeID, vmUUID) {
        this.router.navigate(['/dashboard/vm/' + nodeID + '/' + vmUUID]).then();
    }
}
