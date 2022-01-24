import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  image: any;

  constructor(private camera: Camera, private base64ToGallery: Base64ToGallery, public alertController: AlertController) { }

  ngOnInit() {
  }

  async takePicture() {
     const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      //saveToPhotoAlbum: true,
      correctOrientation:true
    };
    await this.camera.getPicture(options)
      .then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.log(err)});
      await this.alertaGal("¿Quieres guardar la foto en la galería?");
  }

  savedGal(){
    this.base64ToGallery.base64ToGallery(this.image.split(',')[1],{mediaScanner:true, prefix: '_img'}).then((value)=>{
      this.presentAlert("Imagen Guardada");
      this.image == "";
    },(err)=>{
        this.presentAlert("Error al guardar");
    });
  }

  async alertaGal(pregunta: string){
    const gallery = await this.alertController.create({
      header: 'Alert',
      message: pregunta,
      buttons: [
        {
          text:'Aceptar',
          handler: () => {
            this.savedGal()}
        },
        {
          text:'Cancelar',
        }
      ]
    });

    await gallery.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['Cancel']
    });

    await alert.present();
  }
}
