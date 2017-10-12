import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TresPage } from "./tres";

@NgModule({
  declarations: [
    TresPage
  ],
  imports: [
    IonicPageModule.forChild(TresPage)
  ]
})
export class Module {}
