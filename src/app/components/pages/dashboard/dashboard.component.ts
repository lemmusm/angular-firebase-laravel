import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { Userdb } from '../../../interfaces/userdb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  model = new User();
  modeldb = new Userdb();
  fbauth_uid: any;

  constructor(private authservice: AuthService, private router: Router) {
    this.getDataAuth();
  }

  ngOnInit() {}

  /*
  ** Obtiene los datos de FirebaseAuth, los almacena en una interface,
  ** después esta interface es usada para guardar los datos a través del
  ** método saveData() en MySQL
  */
  getDataAuth() {
    // Se obtienen los datos de FirebaseAuth y los almacena en el modelo/interface
    this.authservice.fbservice.authState.subscribe(data => {
      // Almacena datos de FireAuth en el módelo
      this.model.username = data.displayName;
      this.model.email = data.email;
      this.model.urlavatar = data.photoURL;
      this.model.uid = data.uid;

      // Con los datos almacenados en el modelo a través del método saveData() envia los datos mediante POST para guardarlos en MySQL
      this.authservice.saveData(this.model).subscribe(
        response => {
          console.log(response); // obtiene respuesta del servidor
          console.log(this.model); // imprime datos almacenados en el modelo
        },
        error => {
          // show error
          console.log(error);
        }
      );
    });
  }
  verifyRegisterincomplete() {
    // Se obtiene uid de Fireauth y se almacena en variable
    this.authservice.fbservice.authState.subscribe(data => {
      this.fbauth_uid = data.uid;
      // Trae los datos de la base de datos
      this.authservice
        .getDataById(this.fbauth_uid)
        .subscribe((response: any) => {
          this.modeldb.dpto = response.dpto;
          if (this.modeldb.dpto) {
            this.router.navigate(['userview']);
          } else {
            this.router.navigate(['edit']);
          }
        });
    });
  }

  signOut() {
    this.authservice.singOut();
  }
}
