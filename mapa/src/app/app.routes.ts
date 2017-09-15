import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from'./componentes/home/home.component';
import {ReproductorComponent} from './componentes/reproductor/reproductor.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reproductor/:id', component: ReproductorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
