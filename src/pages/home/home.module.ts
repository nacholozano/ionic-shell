import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
// import {SharedModule} from "../../app/shared.module";
import { IonicShellModule } from '../../app/ionic-shell/ionic-shell.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicShellModule
    // SharedModule
  ]
})
export class HomeModule {}
