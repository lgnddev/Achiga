import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/servicios/bd.service';

@Component({
  selector: 'app-almuerzo',
  templateUrl: './almuerzo.component.html',
  styleUrls: ['./almuerzo.component.scss'],
})
export class AlmuerzoComponent implements OnInit {

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
