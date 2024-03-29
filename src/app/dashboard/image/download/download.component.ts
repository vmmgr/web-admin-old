import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../../../service/storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ImageService} from '../../../service/image.service';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {

    public imageVM = true;
    public storages: any[] = [];
    public connectionInput = new FormGroup({
        storage_id: new FormControl(''),
        url: new FormControl(),
        name: new FormControl(),
    });
    public cloudInit = false;

    constructor(
        public storageService: StorageService,
        public imageService: ImageService,
    ) {
    }

    ngOnInit(): void {
        this.storageService.openStorageProgressWebSocket();
        this.storageService.get().then(res => {
            console.log(res);
            this.storages = res.storage;
            console.log(this.connectionInput.value);
        });
    }

    ngOnDestroy(): void {
        this.storageService.closeStorageWebSocket();
    }

    downloadCDROM(): void {
        const body = {
            url: this.connectionInput.value.url,
            name: this.connectionInput.value.name
        };
        this.imageService.createCDROM(this.connectionInput.value.storage_id, body).then(r => console.log(r));
    }

    downloadFloppy(): void {
    }

    downloadVM(): void {
        const body = {
            url: this.connectionInput.value.url,
            name: this.connectionInput.value.name,
            cloud_init: this.cloudInit
        };
        this.imageService.createVM(this.connectionInput.value.storage_id, body).then(r => console.log(r));
    }
}
