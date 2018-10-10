import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  title = 'GoogleAuth';

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.authservice.loginWithGoogle();
  }
}
