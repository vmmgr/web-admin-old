import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {NodeService} from '../../service/node.service';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

    constructor(
        private nodeService: NodeService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    public node: any[] = new Array();
    public loading = true;

    ngOnInit(): void {
        this.nodeService.getAll().then(response => {
            console.log(response);
            if (response.status) {
                this.node = response.node;
                this.loading = false;
                console.log(this.node);
                this.commonService.openBar('OK', 5000);
            } else {
                console.log('error: ' + JSON.stringify(response));
                return;
            }
        });
    }

    nodeDetailPage(id): void {
        this.router.navigate(['/dashboard/node/' + id]).then();
    }

}
