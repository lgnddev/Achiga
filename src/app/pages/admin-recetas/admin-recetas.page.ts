import { Component, OnInit } from '@angular/core';
import { BDService } from 'src/app/servicios/bd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-recetas',
  templateUrl: './admin-recetas.page.html',
  styleUrls: ['./admin-recetas.page.scss'],
})
export class AdminRecetasPage implements OnInit {
  recetas: any = [
    {
      id_receta: '',
      nom_receta: '',
      tiempo: '',
      ingredientes: '',
      preparacion: '',
      descripcion: '',
      id_difi: '',
      id_tipo: '',
      id_usu: ''
    }
  ]
  constructor(private servicioBD: BDService, public AlertController: AlertController) { }

  async ngOnInit() {
    this.servicioBD.buscarRec();
    this.servicioBD.dbState().subscribe((res) => {
      if (res) {
        this.servicioBD.fetchbuscarR().subscribe(item => {
          this.recetas = item;
        })
      }
    });
  }



  async eliminarR(id) {
    const alert = await this.AlertController.create({
      header: 'Confirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.servicioBD.borrarRec(id);
            this.servicioBD.presentAlert("Receta Eliminada");
          }
        }
      ]
    });
    await alert.present();
   
  }

}
