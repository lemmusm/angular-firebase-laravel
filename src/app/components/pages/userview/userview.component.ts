import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Userdb } from '../../../interfaces/userdb';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styles: []
})
export class UserviewComponent implements OnInit {
  fbauth_uid: any;
  modeldb = new Userdb();

  constructor(private authservice: AuthService) {
    this.getDataById();
   }

  ngOnInit() {
  }

  getDataById() {
    this.authservice.fbservice.authState
        .subscribe(
          data => {
            this.fbauth_uid = data.uid;
            console.log(this.fbauth_uid);
            // Trae los datos de la base de datos
            this.authservice.getDataById(this.fbauth_uid).subscribe((response: any) => {
              console.log(response);
              this.modeldb.id = response.id;
              this.modeldb.uid = response.uid;
              this.modeldb.username = response.username;
              this.modeldb.email = response.email;
              this.modeldb.urlavatar = response.urlavatar;
              this.modeldb.dpto = response.dpto;
              this.modeldb.puesto = response.puesto;
              console.log(this.modeldb);
            });
          }
        );
  }
  signOut() {
    this.authservice.singOut();
  }
}
