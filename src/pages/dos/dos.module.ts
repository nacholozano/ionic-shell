import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosPage } from "./dos";

@NgModule({
  declarations: [
    DosPage
  ],
  imports: [
    IonicPageModule.forChild(DosPage)
  ]
})
export class DosModule {}
