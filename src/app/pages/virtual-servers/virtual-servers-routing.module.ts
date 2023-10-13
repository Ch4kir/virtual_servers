import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualServersComponent } from './virtual-servers.component';

const routes: Routes = [
  {
    path:'',
    component: VirtualServersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualServersRoutingModule { }
