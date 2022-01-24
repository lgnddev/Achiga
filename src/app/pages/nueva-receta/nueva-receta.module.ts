import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaRecetaPageRoutingModule } from './nueva-receta-routing.module';

import { NuevaRecetaPage } from './nueva-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaRecetaPageRoutingModule
  ],
  declarations: [NuevaRecetaPage]
})
export class NuevaRecetaPageModule {}
