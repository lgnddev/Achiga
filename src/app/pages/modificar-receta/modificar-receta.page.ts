import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute, Router } from '@angular/router';
import { BDService } from 'src/app/servicios/bd.service';
import { AlertController } from '@ionic/angular';
import { ArrayDataSource } from '@angular/cdk/collections';
import { element } from 'protractor';

@Component({
  selector: 'app-modificar-receta',
  templateUrl: './modificar-receta.page.html',
  styleUrls: ['./modificar-receta.page.scss'],
})
export class ModificarRecetaPage implements OnInit {

  receta: any = {
    nom_receta: '',
    tiempo: '',
    ingredientes: '',
    preparacion: '',
    descripcion: '',
    id_difi: '',
    id_tipo: '',
    id_usu: '',
    id_receta: ''
  }


  @ViewChild('stepper') stepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  endOfForm: boolean = false;
  startOfForm: boolean = true;
  headers = ["Ingrediente", "Cantidad"];
  ingrediente: string;
  cantidad: string;
  items = [];
  valor: number;
  idReceta: any;
  recetaBD: any[] = [];
  rows: any[] = []
  rows1 = [];
  dificultad: number;

  constructor(private _formBuilder: FormBuilder, private router: Router, private servicioDB: BDService, private activeroute: ActivatedRoute, public AlertController: AlertController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idReceta = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  async ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    await this.servicioDB.fichaReceta(this.idReceta)
    await this.servicioDB.dbState().subscribe((res) => {
      if (res) {
        this.servicioDB.fetchFRec().subscribe(item => {
          this.recetaBD = item;
        })
      }
    });
    this.traspasarDatos();
  }

  traspasarDatos() {
    var receta = this.recetaBD[0];
    this.receta.id_receta = receta.id_receta,
      this.receta.nom_receta = receta.nom_receta,
      this.receta.tiempo = receta.tiempo,
      this.receta.ingredientes = receta.ingredientes,
      this.receta.preparacion = receta.preparacion,
      this.receta.descripcion = receta.descripcion,
      this.receta.id_difi = receta.id_difi,
      this.receta.id_tipo = receta.id_tipo,
      this.receta.id_usu = receta.id_usu
    this.rows = this.receta.ingredientes.split(";").map(function (x) { return x.split(":") })
  }

  Anterior() {
    this.stepper.previous();
  }

  Siguente() {
    this.stepper.next();

  }

  Cancelar(){
    this.router.navigate(['/tus-recetas']);
  }

  agregar() {
    this.rows.push([this.ingrediente, this.cantidad])
  }

  deleteRow(d) {
    const index = this.rows.indexOf(d);
    this.rows.splice(index, 1);
    this.items.splice(index, 1);
  }

  deleteRow1(d) {
    const index = this.rows.indexOf(d);
    this.rows.splice(index, 1);
    this.items.splice(index, 1);
  }


  selectionChange(event: StepperSelectionEvent) {
    if (event.selectedIndex == 3) {
      this.endOfForm = true;
    } else {
      this.endOfForm = false;
    }
    if (event.selectedIndex == 0) {
      this.startOfForm = true;
    } else {
      this.startOfForm = false;
    }
  }

  input(event: MatSliderChange) {
    this.valor = event.value
  }

  convertir(){
    var str = "";
    for (var i = 0 ; i < this.rows.length; i++){
      for (var k = 0; k < 1+1; k++){
        if (k == 1){
          str += this.rows[i][k]+";"
        } else if (k == 0){
          str += this.rows[i][k]+":"
        }
      }
    }
    str = str.slice(0, -1)
    this.receta.ingredientes = str
  }
  
  async confirmacion() {
    const alert = await this.AlertController.create({
      header: 'Confirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: () => {
            this.guardar();
          }
        }
      ]
    });
    await alert.present();
  }


  guardar() {
    this.convertir();
    this.receta.id_difi = this.dificultad;
    this.servicioDB.updateReceta(this.receta.nom_receta, this.receta.tiempo, this.receta.ingredientes, this.receta.preparacion, this.receta.descripcion, this.receta.id_difi, this.receta.id_tipo, this.receta.id_receta, this.receta.id_usu);
    this.router.navigate(['/tus-recetas']);
  }

  


}
