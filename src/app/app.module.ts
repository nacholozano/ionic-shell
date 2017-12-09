import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UnoPage } from '../pages/uno/uno';
import { IonicShellModule } from './ionic-shell/ionic-shell.module';
import { HomeModule } from '../pages/home/home.module';
import { UnoModule } from '../pages/uno/uno.module';
// import { DosModule } from '../pages/dos/dos.module';

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // UnoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicShellModule.forRoot(),
    HomeModule,
    UnoModule,
    // DosModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    // UnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
