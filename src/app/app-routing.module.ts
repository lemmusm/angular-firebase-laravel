import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AuthGuardService } from './providers/auth-guard.service';
import { EditComponent } from './components/pages/edit/edit.component';
import { UserviewComponent } from './components/pages/userview/userview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'userview',
    component: UserviewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
