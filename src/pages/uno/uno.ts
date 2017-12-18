import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';

@IonicPage()
@Component({
  selector: 'page-uno',
  templateUrl: 'uno.html',
})
export class UnoPage {

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      // console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
