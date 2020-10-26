import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ConnectionService} from '../../../service/connection.service';

@Component({
  selector: 'app-connection-detail',
  templateUrl: './connection-detail.component.html',
  styleUrls: ['./connection-detail.component.scss']
})
export class ConnectionDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public connectionService: ConnectionService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public connectionInput = new FormGroup({
    ID: new FormControl(),
    group_id: new FormControl(),
    user_id: new FormControl(),
    open: new FormControl(),
    service: new FormControl(),
    service_id: new FormControl(),
    noc: new FormControl(),
    noc_ip: new FormControl(),
    term_ip: new FormControl(),
    fee: new FormControl(),
    v4_our: new FormControl(),
    v4_your: new FormControl(),
    v6_our: new FormControl(),
    v6_your: new FormControl()
  });
  public loading = true;
  public hide = false;
  public connection: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.connectionService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.connection = response.data[0];
        this.connectionInput.patchValue({
          ID: response.data[0].ID,
          group_id: response.data[0].group_id,
          user_id: response.data[0].user_id,
          open: response.data[0].open,
        });
        this.loading = false;
        console.log(this.connection);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const json = JSON.stringify(this.connectionInput.getRawValue());
    console.log(json);
    this.connectionService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }
}
