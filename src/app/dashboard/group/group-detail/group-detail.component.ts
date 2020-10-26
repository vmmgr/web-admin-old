import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {GroupService} from '../../../service/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public groupService: GroupService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public groupInput = new FormGroup({
    ID: new FormControl(),
    org: new FormControl(),
    status: new FormControl(),
    lock: new FormControl(),
  });
  public loading = true;
  public hide = false;
  public group: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.groupService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.group = response.group[0];
        this.groupInput.patchValue({
          ID: response.group[0].ID,
          status: response.group[0].status,
          lock: response.group[0].lock,
        });
        this.loading = false;
        console.log(this.group);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const json = JSON.stringify(this.groupInput.getRawValue());
    console.log(json);
    this.groupService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

}
