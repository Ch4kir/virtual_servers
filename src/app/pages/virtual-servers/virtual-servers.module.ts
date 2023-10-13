import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualServersRoutingModule } from './virtual-servers-routing.module';
import { VirtualServersComponent } from './virtual-servers.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VirtualServersComponent
  ],
  imports: [
    CommonModule,
    VirtualServersRoutingModule,
    FormsModule
  ]
})
export class VirtualServersModule { }
