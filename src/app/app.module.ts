import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// httpclient
import { HttpClientModule } from '@angular/common/http';

// mdbootstrap
import { MDBootstrapModule } from './mdbootstrap.module';
// components
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
// providers
import { AuthService } from './providers/auth.service';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EditComponent } from './components/pages/edit/edit.component';
import { UserviewComponent } from './components/pages/userview/userview.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent, EditComponent, UserviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBootstrapModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
