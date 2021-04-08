import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {VmService} from '../../service/vm.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-vm',
    templateUrl: './vm.component.html',
    styleUrls: ['./vm.component.scss']
})
export class VmComponent implements OnInit, OnDestroy {
    public vms: any[] = new Array();

    constructor(
        public vmService: VmService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.vmService.openWebSocket();
    }

    ngOnDestroy() {
        this.vmService.closeWebSocket();
    }

    detailPage(nodeID, vmUUID) {
        this.router.navigate(['/dashboard/vm/' + nodeID + '/' + vmUUID]).then();
    }

    noVNCPage(nodeID, vmUUID) {
        window.open(environment.novnc.url + '/0/' + sessionStorage.getItem('AccessToken') + '/' + nodeID + '?uuid=' + vmUUID,
            '_blank');
        // this.router.navigate(['/dashboard/vm/' + nodeID + '/' + vmUUID]).then();
    }
}
