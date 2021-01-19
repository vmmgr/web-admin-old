import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {VmDirectService} from '../../service/vm-direct.service';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-vm-direct',
    templateUrl: './vm-direct.component.html',
    styleUrls: ['./vm-direct.component.scss']
})
export class VmDirectComponent implements OnInit {
    host = new FormControl();
    public vms: any[] = new Array();

    constructor(
        public vmDirectService: VmDirectService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.host.setValue('http://localhost:8080');
    }

    search() {
        this.vms = null;
        this.vmDirectService.getAll(this.host.value).then((response) => {
            if (response.status === 200) {
                this.vms = response.data.vm;
                sessionStorage.setItem('vm-direct', this.host.value);
            }
            console.log(response);
        });
    }

    detailPage(id) {
        this.router.navigate(['/dashboard/vm-direct/' + id]).then();
    }
}
