import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/servicios/bd.service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

  constructor(private servicioDB: BDService, private router: Router) { }

  usuarioBD : any;
  listaFav : any;
  idUsuario : any;

  async ngOnInit() {
    await this.servicioDB.dbState().subscribe((res) =>{
      if(res){
        this.servicioDB.fetchUsuario().subscribe(item =>{
          this.usuarioBD = item;
        })
      }
    });
    await this.traspasarDatos();
    await this.servicioDB.traerFavoritosLista(this.idUsuario);
    await this.servicioDB.dbState().subscribe((res) =>{
      if(res){
        this.servicioDB.fetchFavoritosLista().subscribe(item =>{
          this.listaFav = item;
        })
      }
    });
  }

  traspasarDatos(){
    var usuario = this.usuarioBD[0]
    this.idUsuario = usuario.id_usu
  }

  visualizar(id){
    let navigationExtras: NavigationExtras = {
      state: {id}
    }
    this.router.navigate(['/receta'], navigationExtras);
  }

}
