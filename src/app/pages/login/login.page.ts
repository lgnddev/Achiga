import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastController } from '@ionic/angular';
import { BDService } from 'src/app/servicios/bd.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild("title", { read: ElementRef, static: true }) title: ElementRef;

  usuarioIngresado: any = {
    Usuario: "",
    Contrasena: ""
  };

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  public load: Boolean = false;

  field: string = "";
  usuario: any = []
  reverseGeocodingResults: string = "";

  constructor(private router: Router, private animationCtrl: AnimationController, public toastController: ToastController, private servicioDB: BDService, public geolocation: Geolocation, public geocoder: NativeGeocoder, public platform: Platform, public AlertController: AlertController) {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        this.ReverseGeocoding(latitude, longitude)
      })
    })
  }

  async ReverseGeocoding(latitude, longitude) {
    var options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    }
    await this.geocoder.reverseGeocode(latitude, longitude, options).then((results) => {
      this.reverseGeocodingResults = JSON.stringify(results[0].countryName)
    })
    if (this.reverseGeocodingResults != '\"Chile\"') {
      this.verificacion(this.reverseGeocodingResults);
    }
  }


  ngOnInit() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.title.nativeElement)
      .duration(1500)
      .fromTo("opacity", 0, 1);
    animation.play();

    this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchUsuario().subscribe(item => {
          this.usuario = item;
        })
      }
    });
  }

  async quienesSomos(){
    const alert = await this.AlertController.create({
      header: '¿Quienes Somos?',
      message: 'Achiga es una aplicacion movil para crear, buscar, comentar y compartir Recetas',
    });
    await alert.present();
  }

  async verificacion(a) {
    const alert = await this.AlertController.create({
      header: 'Aviso',
      message: 'Aplicacion no disponible en tu país '+a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

  async login() {
    await this.servicioDB.login(this.usuarioIngresado.Usuario, this.usuarioIngresado.Contrasena)
    if (this.usuario.length == 0) {
      this.presentToast("El usuario no existe");
    } else {
      this.router.navigate(['folder/Inbox']);
      this.presentToast("Bienvenido(a)");
    }
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        cssClass: 'toast-wrapper.toast-bottom',
        message: message,
        position: 'bottom',
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
}