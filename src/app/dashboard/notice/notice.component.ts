import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {NoticeService} from '../../service/notice.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {


  constructor(
    private noticeService: NoticeService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  public notice: any[] = new Array();
  public loading = true;
  public noticeInput = new FormGroup({
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
  public unixTime: any;

  ngOnInit(): void {
    this.unixTime = Math.floor(new Date().getTime() / 1000);
    console.log('unixTime: ' + this.unixTime);
    this.noticeService.getAll().then(response => {
      console.log(response);
      if (response.status) {
        this.notice = response.notice;
        this.loading = false;
        console.log(this.notice);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  add(): void {
    const json = this.noticeInput.getRawValue();
    const startTime = Math.floor(+new Date(this.noticeInput.value.start_time) / 1000);
    const endingTime = Math.floor(+new Date(this.noticeInput.value.ending_time) / 1000);
    if (startTime === 0) {
      this.commonService.openBar('開始時刻が書かれていません。', 5000);
    }
    if (endingTime === 0) {
      this.commonService.openBar('終了時刻が書かれていません。', 5000);
    }
    if (startTime < endingTime) {
      this.commonService.openBar('終了時間が開始時間よりも後になっています。', 5000);
    }
    json.start_time = startTime;
    json.ending_time = endingTime;

    this.noticeService.create(json).then(response => {
      if (response.status) {
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

  detailPage(id): void {
    this.router.navigate(['/dashboard/notice/' + id]).then();
  }

  delete(id): void {
    this.noticeService.delete(id).then(response => {
      console.log(response);
      if (response.status) {
        this.notice = this.notice.filter(item => item.ID !== id);
        this.commonService.openBar('OK', 5000);
      } else {
        this.commonService.openBar('NG', 5000);
        console.log('error: ' + JSON.stringify(response));
      }
    });
  }

}
