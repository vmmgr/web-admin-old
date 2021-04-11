import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../../../service/image.service';
import {CommonService} from '../../../service/common.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-vm-image',
    templateUrl: './vm-image.component.html',
    styleUrls: ['./vm-image.component.scss']
})
export class VmImageComponent implements OnInit, OnDestroy {

    constructor(
        public imageService: ImageService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.imageService.openVMListWebSocket();
    }

    ngOnDestroy() {
        this.imageService.closeVMListWebSocket();
    }
}
