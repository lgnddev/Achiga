import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/servicios/bd.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {

  idusuario: any;
  nombreUsuario: any;
  user: any;
  id: any;
  recetaBD: any[] = []
  comentariosBD: any[] = []
  receta: any = {
    id_receta: '',
    nom_receta: '',
    tiempo: '',
    ingredientes: '',
    preparacion: '',
    descripcion: '',
    id_difi: '',
    id_tipo: '',
    id_usu: '',
  }
  comentario: String = "";
  ingredientes: any[] = []
  usuarioBD: any[] = []
  estadoFav: boolean = false;
  imagenUsuario : any;
  favoritos : any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private activeroute: ActivatedRoute, private servicioDB: BDService, public alertController: AlertController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  async ngOnInit() {
    await this.servicioDB.fichaReceta(this.id)
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchFRec().subscribe(item => {
          this.recetaBD = item;
        })
      }
    });
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuario().subscribe(item => {
          this.usuarioBD = item;
        })
      }
    });
    await this.traspasarDatos()
    await this.servicioDB.listarComentarios(this.receta.id_receta)
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchValoracion().subscribe(item => {
          this.comentariosBD = item;
        })
      }
    });
    await this.servicioDB.traerFavoritos(this.idusuario, this.receta.id_receta)
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchFavoritos().subscribe(item => {
          this.favoritos = item;
        })
      }
    });
    if (this.favoritos.length > 0) {
      this.estadoFav = true;
    }
  }

  favorito(){
    if (this.estadoFav) {
      this.servicioDB.cambiarFavoritos(false, this.idusuario, this.receta.id_receta)
      this.estadoFav = false;
    } else {
      this.servicioDB.cambiarFavoritos(true, this.idusuario, this.receta.id_receta)
      this.estadoFav = true;
    }
  }

 

  traspasarDatos() {
    var receta = this.recetaBD[0];
    this.receta.id_receta = receta.id_receta,
      this.receta.nom_receta = receta.nom_receta,
      this.receta.tiempo = receta.tiempo,
      this.receta.ingredientes = receta.ingredientes,
      this.receta.preparacion = receta.preparacion,
      this.receta.descripcion = receta.descripcion
    if (receta.id_difi == "1") {
      this.receta.id_difi = "Facil";
    } else if (receta.id_difi == "2") {
      this.receta.id_difi = "Medio";
    } else if (receta.id_difi == "3") {
      this.receta.id_difi = "Dificil";
    }
    if (receta.id_tipo == 1) {
      this.receta.id_tipo == "Desayuno"
    } else if (receta.id_tipo == 2) {
      this.receta.id_tipo == "Ensalada"
    } else if (receta.id_tipo == 3) {
      this.receta.id_tipo == "Almuerzo"
    } else if (receta.id_tipo == 4) {
      this.receta.id_tipo == "Postre"
    }
    this.receta.id_usu = receta.id_usu
    this.ingredientes = this.receta.ingredientes.split(";").map(function (x) { return x.split(":") })
    var usuario = this.usuarioBD[0]
    this.idusuario = usuario.id_usu
    this.nombreUsuario = usuario.nombre +' '+ usuario.apellidos
    this.imagenUsuario = usuario.imagen
  }

  enviarComentario() {
    this.servicioDB.addComentario(this.comentario, Date.now(), this.idusuario, this.receta.id_receta)
  }

  eliminarComentario(id){
    this.servicioDB.deleteComentario(id, this.receta.id_receta)
  }

  async alertCtrlEliminar(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desear eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          handler: () => {
            this.eliminarComentario(id)
          }
        }
      ]
    });
    await alert.present();
  }

}
