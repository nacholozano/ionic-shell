import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, PopoverController } from 'ionic-angular';
import { UnoPage } from '../uno/uno';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';
import { PopoverPage } from './popover';

@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uno:any = UnoPage;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public ionicShellProvider: IonicShellProvider,
    public popoverCtrl: PopoverController
  ) {}

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
