import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { BDService } from 'src/app/servicios/bd.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuarioBD: any[] = []
  usuario: any = {
    id_usu: '',
    nombre: '',
    apellidos: '',
    f_nacimiento: '',
    email: '',
    contrasena: '',
  }
  boton: boolean = true;
  count: any;
  nombre: string = ""
  apellido: string = ""
  contadorRecetas: any;
  contadorComentarios: any;
  imagen: any;
  
  constructor(private platform: Platform, private servicioDB: BDService, public actionSheetController: ActionSheetController, 
              private camera: Camera, private photoViewer: PhotoViewer, private base64ToGallery: Base64ToGallery, public alertController: AlertController) { }

  async ngOnInit() {
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuario().subscribe(item => {
          this.usuarioBD = item;
        })
      }
    });
    await this.TraspasarDatos();
    await this.servicioDB.countReceta(this.usuario.id_usu)
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchCount().subscribe(item => {
          this.count = item;
        })
      }
    });
    await this.traspasarCount();
  }

  traspasarCount() {
    var count = this.count[0]
    this.contadorRecetas = count.CuentaRecetas;
    this.contadorComentarios = count.CuentaComentarios;
  }

  TraspasarDatos() {
    var usuario = this.usuarioBD[0];
    this.usuario.id_usu = usuario.id_usu;
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.f_nacimiento = usuario.f_nacimiento;
    this.usuario.email = usuario.email
    this.usuario.contrasena = usuario.contrasena;
    this.nombre = this.usuario.nombre
    this.apellido = this.usuario.apellidos
    this.imagen = usuario.imagen;
  }

  ModoInput() {
    if (this.boton) {
      this.boton = false;
    } else {
      this.boton = true;
      this.servicioDB.updateUsuario(this.usuario.nombre, this.usuario.apellidos, this.usuario.f_nacimiento, this.usuario.email, this.usuario.contrasena, this.usuario.id_usu)
      this.nombre = this.usuario.nombre
      this.apellido = this.usuario.apellidos
    }
  }

  async btnCambiarImagen() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar imagen de perfil',
      buttons: [{
        text: 'Usar Camara',
        icon: 'camera',
        handler: () => {
          this.camara();
        }
      },{
        text: 'Guardar foto en Galeria',
        icon: 'share',
        handler: () => {
          this.savedGal();
        }

      },{
        text: 'Abrir Galeria',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }

      }]
    });
    await actionSheet.present();
  }

  async camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      //saveToPhotoAlbum: true,
      correctOrientation: true
    };
    await this.camera.getPicture(options)
      .then((imageData) => {
        this.imagen = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err)
      });
      await this.servicioDB.setImagen(this.imagen,this.usuario.id_usu, this.usuario.email, this.usuario.contrasena)
  }

  savedGal(){
    this.base64ToGallery.base64ToGallery(this.imagen.split(',')[1],{mediaScanner:true, prefix: '_img'}).then((value)=>{
      this.presentAlert("Imagen Guardada");
      this.imagen == "";
    },(err)=>{
        this.presentAlert("Error al guardar");
    });
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['Cancel']
    });

    await alert.present();
  }

  campass(contra1, contra2, contra3){
    console.log(contra1, contra2, contra3, this.usuario.contrasena);
    if(contra2 == contra3 && contra1== this.usuario.contrasena){
      this.servicioDB.updatContrasena(this.usuario.email, contra3, this.usuario.id_usu)
    }else{
      this.presentAlert("Las Contraseñas no son Iguales")
    }
  }

  async Alertpass() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      inputs: [
        {
          name: 'contra1',
          type: 'password',
          id:'p1',
          placeholder: 'Contraseña Actual'
        },
        {
          name: 'contra2',
          type: 'password',
          id: 'p2',
          placeholder: 'Contraseña Nueva'
        },
        {
          name: 'contra3',
          type: 'password', 
          id: 'p3',
          placeholder: 'Repetir Nueva Contraseña',
        }],
      buttons:[
        {
          text:'Guardar',
          handler:(alertData) =>{
            this.campass(alertData.contra1, alertData.contra2, alertData.contra3)
          }
        },
        {
          text:'Cancelar'
        }]
    });
    await alert.present()
  }


  expandir(){ 
    this.platform.ready().then(()=>{
      var photoUrl = this.imagen;
    this.photoViewer.show(photoUrl,'Foto de Perfil',{share:true});

    })
  }

  async openGallery() {
    let cameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true
    }

    await this.camera.getPicture(cameraOptions).then((imgData) => {
      this.imagen = 'data:image/jpeg;base64,' + imgData;
    }, (err) => {
      console.log(err);
    })
    await this.servicioDB.setImagen(this.imagen,this.usuario.id_usu, this.usuario.email, this.usuario.contrasena)
  }

  

}
