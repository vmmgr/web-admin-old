import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {GroupComponent} from './group/group.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {TokenComponent} from './token/token.component';
import {SupportComponent} from './support/support.component';
import {ChatComponent} from './support/chat/chat.component';
import {NoticeComponent} from './notice/notice.component';
import {NoticeDetailComponent} from './notice/notice-detail/notice-detail.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserDetailComponent,
    GroupComponent,
    GroupDetailComponent,
    TokenComponent,
    SupportComponent,
    ChatComponent,
    NoticeComponent,
    NoticeDetailComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
  ]
})
export class DashboardModule {
}
