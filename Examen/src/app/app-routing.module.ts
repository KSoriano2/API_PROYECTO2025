import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'registrocliente',
    loadChildren: () => import('./pages/registrocliente/registrocliente.module').then( m => m.RegistroclientePageModule)
  },
  {
    path: 'registroempleados',
    loadChildren: () => import('./pages/registroempleados/registroempleados.module').then( m => m.RegistroempleadosPageModule)
  },
  
  {
    path: 'mancatalogo',
    loadChildren: () => import('./pages/mancatalogo/mancatalogo.module').then( m => m.MancatalogoPageModule)
  },
  {
    path: 'despachar',
    loadChildren: () => import('./pages/despachar/despachar.module').then( m => m.DespacharPageModule)
  },
  {
    path: 'consultaventas',
    loadChildren: () => import('./pages/consultaventas/consultaventas.module').then( m => m.ConsultaventasPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
