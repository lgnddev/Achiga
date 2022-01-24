import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

import { AdminRecetasPage } from './admin-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatExpansionModule],
})
export class AdminRecetasPageRoutingModule {}
