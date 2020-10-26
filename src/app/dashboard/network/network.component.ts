import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {NetworkService} from '../../service/network.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  constructor(
    private networkService: NetworkService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public network: any[] = new Array();
  public loading = true;


  ngOnInit(): void {
    this.networkService.getAll().then(response => {
      console.log(response);
      if (response.status) {
        this.network = response.network;
        this.loading = false;
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/network/' + id]).then();
  }
}
