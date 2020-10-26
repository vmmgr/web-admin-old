import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../service/common.service';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {


  constructor(
    private tokenService: TokenService,
    private commonService: CommonService,
  ) {
  }

  public token: any[] = new Array();
  public loading = true;

  ngOnInit(): void {
    this.tokenService.getAll().then(response => {
      console.log(response);
      if (response.status) {
        this.token = response.token;
        this.loading = false;
        console.log(this.token);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  delete(id): void {
    this.tokenService.delete(id).then(response => {
      console.log(response);
      if (response.status) {
        console.log(this.token);
        const tokenTmp = this.token.filter(item => item.ID !== id);
        this.token = tokenTmp;
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

  deleteAll(): void {
    this.tokenService.deleteAll().then(response => {
      console.log(response);
      if (response.status) {
        this.token = response.token;
        console.log(this.token);
        this.commonService.openBar('OK', 5000);
      } else {
        console.log('error: ' + JSON.stringify(response));
        return;
      }
    });
  }

}
