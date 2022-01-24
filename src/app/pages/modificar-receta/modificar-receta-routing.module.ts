import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Routes, RouterModule } from '@angular/router';

import { ModificarRecetaPage } from './modificar-receta.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatTabsModule, MatStepperModule,MatButtonModule, MatFormFieldModule , ReactiveFormsModule, FormsModule, MatInputModule, MatTableModule, MatSliderModule, MatRadioModule],
})
export class ModificarRecetaPageRoutingModule {}
