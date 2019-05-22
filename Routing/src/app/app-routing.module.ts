import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {AuthGuradService} from './auth-gurad.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]},
  {path: 'servers',
  /* canActivate: [AuthGuradService]*/ canActivateChild: [AuthGuradService], component: ServersComponent, children:[
      {path: ':id/edit', component: EditServerComponent},
      {path: ':id', component: ServerComponent},
    ]},
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  {
    // ** wildcard for al lnot covered routes
    // make sure this is as the latest one in routes hierarchy
    path: '**', redirectTo: '/not-found', pathMatch: 'full'
  }
];


@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule {

}
