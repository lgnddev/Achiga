import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

import { RecetaPage } from './receta.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatExpansionModule, MatCardModule],
})
export class RecetaPageRoutingModule {}
