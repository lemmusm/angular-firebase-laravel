import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router } from '@angular/router';
// sweetalert2
import Swal from 'sweetalert2';
import { Userdb } from '../../../interfaces/userdb';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  // variables for handle success/errors
  resmsj: any;
  errorstatus: any;
  // Model for database
  modeldb = new Userdb();
  // variables to storage data from FireAuth
  fbauth_uid: any;
  fbauth_username: any;
  fbauth_email: any;
  fbauth_urlavatar: any;

  constructor(private authservice: AuthService, private router: Router) {
    this.getDataById();
  }

  ngOnInit() {}

  getDataById() {
    this.authservice.fbservice.authState.subscribe(data => {
      this.fbauth_uid = data.uid;
      this.fbauth_username = data.displayName;
      this.fbauth_email = data.email;
      this.fbauth_urlavatar = data.photoURL;
      // console.log(this.fbauth_uid, this.fbauth_username, this.fbauth_email, this.fbauth_urlavatar);
      // Trae los datos de la base de datos
      this.authservice
        .getDataById(this.fbauth_uid)
        .subscribe((response: any) => {
          this.modeldb.dpto = response.dpto;
          this.modeldb.puesto = response.puesto;
        });
    });
  }

  updateProfile() {
    this.authservice
      .updateProfile(this.fbauth_uid, this.modeldb)
      .subscribe(
        response => {
          this.resmsj = response;
          if (this.resmsj.code === 200) {
            const respopup = Swal.mixin(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              }
            );
            respopup(
              {
                type: 'success',
                title: this.resmsj.message
              }
            );
          } else {}
        },
        error => {
          console.log(error);
          this.errorstatus = String(error.status);
          if (this.resmsj.code >= 400) {
            const respopup = Swal.mixin(
              {
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
              }
            );
            respopup(
              {
                type: 'error',
                title: this.errorstatus
              }
            );
          }
        }
      );
  }

  signOut() {
    this.authservice.singOut();
  }
}
