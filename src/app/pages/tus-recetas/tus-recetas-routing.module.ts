import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TusRecetasPage } from './tus-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: TusRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TusRecetasPageRoutingModule {}
