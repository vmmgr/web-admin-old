import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../guard/auth.guard';
import {UserComponent} from './user/user.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {GroupComponent} from './group/group.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {TokenComponent} from './token/token.component';
import {SupportComponent} from './support/support.component';
import {ChatComponent} from './support/chat/chat.component';
import {ConnectionDetailComponent} from './connection/connection-detail/connection-detail.component';
import {ConnectionComponent} from './connection/connection.component';
import {NetworkDetailComponent} from './network/network-detail/network-detail.component';
import {NetworkComponent} from './network/network.component';
import {NoticeComponent} from './notice/notice.component';
import {NoticeDetailComponent} from './notice/notice-detail/notice-detail.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'user', pathMatch: 'full'},
      {path: 'notice', component: NoticeComponent},
      {path: 'notice/:id', component: NoticeDetailComponent},
      {path: 'token', component: TokenComponent},
      {path: 'group', component: GroupComponent},
      {path: 'group/:id', component: GroupDetailComponent},
      {path: 'connection', component: ConnectionComponent},
      {path: 'connection/:id', component: ConnectionDetailComponent},
      {path: 'network', component: NetworkComponent},
      {path: 'network/:id', component: NetworkDetailComponent},
      {path: 'support', component: SupportComponent},
      {path: 'support/:id', component: ChatComponent},
      {path: 'user', component: UserComponent},
      {path: 'user/:id', component: UserDetailComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
