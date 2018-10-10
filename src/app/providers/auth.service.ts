import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Userdb } from '../interfaces/userdb';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: any = 'http://googleauth/';

  constructor(
    public fbservice: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {}

  // start sesion
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.fbservice.auth
      .signInWithPopup(provider)
      .then(data => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        console.log('Error' + error);
      });
  }
  // close sesion
  singOut() {
    this.fbservice.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
  // check login status
  isAuth() {
    return this.fbservice.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  // save data on database
  saveData(user) {
    return this.http.post(`${this.API_URL}api/usuario`, user);
  }

  getDataById(id) {
    return this.http.get(`${this.API_URL}api/usuario/` + id);
  }
  getDataFromDatabase() {
    return this.http.get(`${this.API_URL}api/usuarios`);
  }
  updateProfile(id, userdata) {
    return this.http.put(`${this.API_URL}api/usuario/` + id, userdata);
  }
}
