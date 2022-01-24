import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRecetasPageRoutingModule } from './admin-recetas-routing.module';

import { AdminRecetasPage } from './admin-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRecetasPageRoutingModule
  ],
  declarations: [AdminRecetasPage]
})
export class AdminRecetasPageModule {}
