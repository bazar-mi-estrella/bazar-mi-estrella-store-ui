import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';

const routes: Routes = [
  {
    path:'electronic',
    component:ElectronicsComponent,
    title:'Bazar Mi Estrella - Ecommerce'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
