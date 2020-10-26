import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NoticeService} from '../../../service/notice.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public noticeService: NoticeService,
    private commonService: CommonService,
  ) {
  }

  public id: string;
  public noticeInput = new FormGroup({
    ID: new FormControl(),
    title: new FormControl(),
    data: new FormControl(),
    start_time: new FormControl(),
    ending_time: new FormControl(),
    everyone: new FormControl(),
    fault: new FormControl(),
    important: new FormControl(),
    info: new FormControl(),
    group_id: new FormControl(),
    user_id: new FormControl()
  });
  public loading = true;
  public hide = false;
  public notice: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.noticeService.get(this.id).then(response => {
      console.log(response);
      if (response.status) {
        this.notice = response.notice[0];
        this.noticeInput.patchValue({
          ID: response.notice[0].ID,
          everyone: response.notice[0].everyone,
          fault: response.notice[0].fault,
          important: response.notice[0].important,
          info: response.notice[0].info,
          start_time: response.notice[0].start_time,
          ending_time: response.notice[0].ending_time,
          user_id: response.notice[0].user_id,
          group_id: response.notice[0].group_id,
        });
        this.loading = false;
        console.log(this.notice);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  update(): void {
    const tmp = this.noticeInput;

    tmp.patchValue({
      start_time: Math.floor(+new Date(this.noticeInput.value.start_time) / 1000),
      ending_time: Math.floor(+new Date(this.noticeInput.value.ending_time) / 1000)
    });

    if (tmp.value.start_time === 0) {
      this.commonService.openBar('開始時刻が書かれていません。', 5000);
    }
    if (tmp.value.ending_time === 0) {
      this.commonService.openBar('終了時刻が書かれていません。', 5000);
    }
    if (tmp.value.start_time < tmp.value.ending_time) {
      this.commonService.openBar('終了時間が開始時間よりも後になっています。', 5000);
    }

    const json = JSON.stringify(this.noticeInput.getRawValue());
    console.log(json);

    this.noticeService.update(this.id, json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }
}
