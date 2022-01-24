import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BDService } from '../../servicios/bd.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  usuarios: any = [
    {
      id_usu: '',
      nombre: '',
      apellidos: '',
      f_nacimiento: '',
      email: '',
      contrasena: '',
      id_tipo_usu: ''
    }
  ]

  constructor(private router: Router, private servicioBD: BDService, public AlertController: AlertController) { }

  async ngOnInit() {
    this.servicioBD.buscarUsu();
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchbuscarU().subscribe(item => {
          this.usuarios = item;
        })
      }
    });
  }

  async eliminar(id) {
    const alert = await this.AlertController.create({
      header: 'Confirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.servicioBD.borrarUsu(id);
            this.servicioBD.presentAlert("Usuario Eliminado");
          }
        }
      ]
    });
    await alert.present();

  }

}
