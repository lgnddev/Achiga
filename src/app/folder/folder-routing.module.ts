import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmuerzoComponent } from '../componentes/almuerzo/almuerzo.component';
import { DesayunoComponent } from '../componentes/desayuno/desayuno.component';
import { EnsaladaComponent } from '../componentes/ensalada/ensalada.component';
import { PostreComponent } from '../componentes/postre/postre.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children:[
      {
        path:'desayuno',
        component: DesayunoComponent
      },
      {
        path:'ensalada',
        component: EnsaladaComponent
      },
      {
        path:'almuerzo',
        component: AlmuerzoComponent
      },
      {
        path:'postre',
        component: PostreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
   