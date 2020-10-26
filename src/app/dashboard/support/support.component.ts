import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {SupportService} from '../../service/support.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {


  constructor(
    private supportService: SupportService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public support: any[] = new Array();
  public loading = true;
  public supportInput = new FormGroup({
    title: new FormControl(),
    data: new FormControl(),
    group_id: new FormControl(),
  });

  ngOnInit(): void {
    this.supportService.getAll().then(response => {
      console.log(response);
      if (response.status) {
        this.support = response.support_ticket;
        this.loading = false;
        console.log(this.support);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  add(): void {
    const json = JSON.stringify(this.supportInput.getRawValue());
    console.log(json);
    this.supportService.create(json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

  chatPage(id): void {
    this.router.navigate(['/dashboard/support/' + id]).then();
  }

  solvedPush(id, solved: boolean): void {
    const body = {solved};
    console.log(body);
    this.supportService.update(id, body).then(response => {
      console.log(response);
      if (response.status) {
        const index = this.support.findIndex(item => item.ID === id);
        this.support[index].solved = solved;
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

}
