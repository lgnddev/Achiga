import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { BDService } from 'src/app/servicios/bd.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tus-recetas',
  templateUrl: './tus-recetas.page.html',
  styleUrls: ['./tus-recetas.page.scss'],
})
export class TusRecetasPage implements OnInit {


  listaRecetasBD : any [] = []
  usuarioBD: any[] = []
  idUsuario: string = "";

  constructor(public actionSheetController: ActionSheetController, private servicioDB: BDService, private router: Router, private AlertController: AlertController) { }

  ngOnInit() {
    this.servicioDB.dbState().subscribe((res) =>{
      if(res){
        this.servicioDB.fetchRecUsua().subscribe(item =>{
          this.listaRecetasBD = item;
        })
      }
    });
    this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuario().subscribe(item => {
          this.usuarioBD = item;
        })
      }
    });
    this.TraspasarID();
    this.TraerDatos();
  }

  TraspasarID() {
    var usuario = this.usuarioBD[0];
    this.idUsuario = usuario.id_usu;
  }

  async TraerDatos(){
    await this.servicioDB.recetasUsuario(this.idUsuario)
  }

  
  visualizar(id){
    let navigationExtras: NavigationExtras = {
      state: {id}
    }
    this.router.navigate(['/receta'], navigationExtras);
  }

  async presentActionSheet(mensaje: string, id: number) {
    const actionSheet = await this.actionSheetController.create({
      header: mensaje,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Visualizar',
        icon: 'eye-outline',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {id}
          }
          this.router.navigate(['/receta'], navigationExtras);
        }
      }, {
        text: 'Modificar',
        icon: 'brush',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {id}
          }
          this.router.navigate(['/modificar-receta'], navigationExtras);
        }
      }, {
        text: 'Eliminar',
        icon: 'trash',
        handler: () => {
          this.confirmacion(id);
        }
      
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async confirmacion(id) {
    const alert = await this.AlertController.create({
      header: 'Confirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.servicioDB.deleteReceta(id, this.idUsuario)
          }
        }
      ]
    });
    await alert.present();
  }

}
