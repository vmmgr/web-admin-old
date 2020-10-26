import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NetworkService} from '../../../service/network.service';

@Component({
  selector: 'app-network-detail',
  templateUrl: './network-detail.component.html',
  styleUrls: ['./network-detail.component.scss']
})
export class NetworkDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public networkService: NetworkService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public networkInput = new FormGroup({
    ID: new FormControl(),
    asn: new FormControl(),
    group_id: new FormControl(),
    v4: new FormControl(),
    v4_name: new FormControl(),
    v6: new FormControl(),
    v6_name: new FormControl(),
    lock: new FormControl(),
    open: new FormControl()
  });
  public loading = true;
  public hide = false;
  public network: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.networkService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.network = response.network[0];
        this.networkInput.patchValue({
          ID: response.network[0].ID,
          group_id:response.network[0].group_id,
          lock: response.network[0].lock,
          open: response.network[0].open,
        });
        this.loading = false;
        console.log(this.network);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const json = JSON.stringify(this.networkInput.getRawValue());
    console.log(json);
    this.networkService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }
}
