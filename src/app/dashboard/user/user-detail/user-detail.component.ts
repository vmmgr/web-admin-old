import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public userInput = new FormGroup({
    ID: new FormControl(),
    gid: new FormControl(),
    name: new FormControl(),
    name_en: new FormControl(),
    email: new FormControl(),
    pass: new FormControl(),
    org: new FormControl(),
    org_en: new FormControl(),
    postcode: new FormControl(),
    address: new FormControl(),
    address_en: new FormControl(),
    dept: new FormControl(),
    dept_en: new FormControl(),
    pos: new FormControl(),
    pos_en: new FormControl(),
    tel: new FormControl(),
    fax: new FormControl(),
    country: new FormControl(),
    status: new FormControl(),
    level: new FormControl(),
    tech: new FormControl(false)
  });
  public loading = true;
  public hide = false;
  public user: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.user = response.data[0];
        this.userInput.patchValue({
          ID: response.data[0].ID,
          status: response.data[0].status,
          level: response.data[0].level,
          gid: response.data[0].gid,
          tech: response.data[0].tech
        });
        this.loading = false;
        console.log(this.user);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const json = JSON.stringify(this.userInput.getRawValue());
    console.log(json);
    this.userService.update(this.id, json).then(response => {
      this.commonService.openBar('OK', 5000);
      location.reload();
    });
  }
}
