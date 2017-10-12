import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnoPage } from "./uno";

@NgModule({
  declarations: [
    UnoPage
  ],
  imports: [
    IonicPageModule.forChild(UnoPage)
  ],
  entryComponents: [
    UnoPage
  ]
})
export class Module {}
