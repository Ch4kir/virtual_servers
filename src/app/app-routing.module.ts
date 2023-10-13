import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'virtual-servers',
    pathMatch: 'full'
  },
  { // lazy loading the module
    path: 'virtual-servers',
    loadChildren: ()=> import('./pages/virtual-servers/virtual-servers.module').then(m=>m.VirtualServersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
