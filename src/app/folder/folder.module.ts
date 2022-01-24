import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { DesayunoComponent } from '../componentes/desayuno/desayuno.component';
import { EnsaladaComponent } from '../componentes/ensalada/ensalada.component';
import { AlmuerzoComponent } from '../componentes/almuerzo/almuerzo.component';
import { PostreComponent } from '../componentes/postre/postre.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, DesayunoComponent, EnsaladaComponent, AlmuerzoComponent, PostreComponent]
})
export class FolderPageModule {}
