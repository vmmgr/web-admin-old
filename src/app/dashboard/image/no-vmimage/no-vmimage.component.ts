import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '../../../service/common.service';
import {Router} from '@angular/router';
import {ImageService} from '../../../service/image.service';

@Component({
    selector: 'app-no-vmimage',
    templateUrl: './no-vmimage.component.html',
    styleUrls: ['./no-vmimage.component.scss']
})
export class NoVMImageComponent implements OnInit, OnDestroy {

    constructor(
        public imageService: ImageService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.imageService.openNoVMListWebSocket();
    }

    ngOnDestroy() {
        this.imageService.closeNoVMListWebSocket();
    }
}
