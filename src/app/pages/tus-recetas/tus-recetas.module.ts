import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TusRecetasPageRoutingModule } from './tus-recetas-routing.module';

import { TusRecetasPage } from './tus-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TusRecetasPageRoutingModule
  ],
  declarations: [TusRecetasPage]
})
export class TusRecetasPageModule {}
