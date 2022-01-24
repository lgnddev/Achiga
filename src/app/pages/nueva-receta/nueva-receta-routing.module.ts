import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { NuevaRecetaPage } from './nueva-receta.page';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';



const routes: Routes = [
  {
    path: '',
    component: NuevaRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,MatTabsModule, MatStepperModule,MatButtonModule, MatFormFieldModule , ReactiveFormsModule, FormsModule, MatInputModule, MatTableModule, MatSliderModule, MatRadioModule],
})
export class NuevaRecetaPageRoutingModule {}
