import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SupportService} from '../../../service/support.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {


  public comment = new FormControl();
  public ticketID: number;
  public chat: any;
  public user: any[] = [];
  public myName = sessionStorage.getItem('name');

  constructor(
    public supportService: SupportService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private userService: UserService
  ) {
  }


  ngOnInit(): void {
    this.ticketID = +this.route.snapshot.paramMap.get('id');
    this.supportService.openWebSocket(this.ticketID);
    this.userService.getAll().then(responseUser => {
      console.log(responseUser);
      const user = responseUser;
      if (user.status) {
        this.user = user.data;
      } else {
        this.commonService.openBar('no data', 5000);
      }
    });
    this.supportService.get(this.ticketID).then(response => {
      console.log(response);
      const info = response;
      if (info.status) {
        this.chat = info.support_chat;
        console.log(info);
        // this.lock = false;
      } else {
        this.commonService.openBar('no data', 5000);
      }
    });

  }

  ngOnDestroy() {
    this.supportService.closeWebSocket();
  }

  public getName(id): string {
    for (const u of this.user) {
      if (u.ID === id) {
        return u.name;
      }
    }
    return 'no name';
  }

  public sendMessage() {
    const body = {
      user_token: sessionStorage.getItem('ClientID'),
      access_token: sessionStorage.getItem('AccessToken'),
      message: this.comment.value
    };
    this.supportService.sendMessage(JSON.stringify(body));
  }
}
