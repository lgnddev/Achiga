import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsuariosPage } from './admin-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatExpansionModule],
})
export class AdminUsuariosPageRoutingModule {}
