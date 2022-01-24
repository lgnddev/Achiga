import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'nueva-receta',
    loadChildren: () => import('./pages/nueva-receta/nueva-receta.module').then( m => m.NuevaRecetaPageModule)
  },
  {
    path: 'tus-recetas',
    loadChildren: () => import('./pages/tus-recetas/tus-recetas.module').then( m => m.TusRecetasPageModule)
  },
  {
    path: 'receta',
    loadChildren: () => import('./pages/receta/receta.module').then( m => m.RecetaPageModule)
  },
  {
    path: 'inscripcion',
    loadChildren: () => import('./pages/inscripcion/inscripcion.module').then( m => m.InscripcionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'admin-recetas',
    loadChildren: () => import('./pages/admin-recetas/admin-recetas.module').then( m => m.AdminRecetasPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('./pages/admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'modificar-receta',
    loadChildren: () => import('./pages/modificar-receta/modificar-receta.module').then( m => m.ModificarRecetaPageModule)
  },  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'favorito',
    loadChildren: () => import('./pages/favorito/favorito.module').then( m => m.FavoritoPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
