import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/servicios/bd.service';

@Component({
  selector: 'app-desayuno',
  templateUrl: './desayuno.component.html',
  styleUrls: ['./desayuno.component.scss'],
})
export class DesayunoComponent implements OnInit {

  constructor(private servicioDB : BDService, private router : Router) { }

  listaRecetasBD : any [] = []
  
  async ngOnInit() {
    await this.servicioDB.home();
    await this.servicioDB.dbState().subscribe((res) =>{
      if(res){
        this.servicioDB.fetchHome().subscribe(item =>{
          this.listaRecetasBD = item;
        })
      }
    });
  }

  visualizar(id){
    let navigationExtras: NavigationExtras = {
      state: {id}
    }
    this.router.navigate(['/receta'], navigationExtras);
  }

}

