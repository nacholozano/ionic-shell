/*import { BrowserModule } from '@angular/platform-browser';*/
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
/*import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';*/
import { IonicShellComponent } from './components/ionic-shell';
import { IonicShellHeaderComponent } from './components/ionic-shell-header/ionic-shell-header';
import { IonicShellTabsComponent } from './components/ionic-shell-tabs/ionic-shell-tabs';
import { IonicShellTabComponent } from './components/ionic-shell-tab/ionic-shell-tab';
import { IonicShellTabsButtonsComponent } from './components/ionic-shell-tabs-buttons/ionic-shell-tabs-buttons';

import { IonicShellProvider } from './providers/ionic-shell';

@NgModule({
  declarations: [
    IonicShellComponent,
    IonicShellHeaderComponent,
    IonicShellTabsComponent,
    IonicShellTabComponent,
    IonicShellTabsButtonsComponent
    /*MyApp,
    HomePage*/
  ],
  imports: [
    CommonModule,
    IonicModule
    /*BrowserModule,
    IonicModule.forRoot(MyApp)*/
  ],
  bootstrap: [
    /*IonicApp*/
  ],
  entryComponents: [
    IonicShellComponent,
    IonicShellHeaderComponent,
    IonicShellTabsComponent,
    IonicShellTabComponent,
    IonicShellTabsButtonsComponent
    /*MyApp,
    HomePage*/
  ],
  exports: [
    IonicShellComponent,
    IonicShellHeaderComponent,
    IonicShellTabsComponent,
    IonicShellTabComponent,
    IonicShellTabsButtonsComponent
  ],
  providers: [
    IonicShellProvider
    /*StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}*/
  ]
})
export class IonicShellModule {}
