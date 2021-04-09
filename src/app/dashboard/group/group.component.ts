import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../service/group.service';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public group: any[] = new Array();
  public loading = true;

  ngOnInit(): void {
    this.groupService.getAll().then(response => {
      console.log(response);
      if (response.error === null) {
        this.group = response.data.group;
        this.loading = false;
        console.log(this.group);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  groupPage(id): void {
    this.router.navigate(['/dashboard/group/' + id]).then();
  }

}
