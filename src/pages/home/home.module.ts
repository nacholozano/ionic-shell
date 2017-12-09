import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
// import {SharedModule} from "../../app/shared.module";
import { IonicShellModule } from '../../app/ionic-shell/ionic-shell.module';
import { PopoverPage } from './popover';

@NgModule({
  declarations: [
    HomePage,
    PopoverPage
  ],
  entryComponents: [
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicShellModule
    // SharedModule
  ]
})
export class HomeModule {}
