import {Component, OnInit} from '@angular/core';
import {VmDirectService} from '../../../service/vm-direct.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-vm-direct-detail',
    templateUrl: './vm-direct-detail.component.html',
    styleUrls: ['./vm-direct-detail.component.scss']
})
export class VmDirectDetailComponent implements OnInit {

    public vm: any;
    public vmXml: string;
    public loading = true;
    public id: string;

    constructor(
        private vmDirectService: VmDirectService,
        private route: ActivatedRoute,
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
            console.log(response);
        });
    }

}
