import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { UnoPage } from '../uno/uno';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';

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
    public ionicShellProvider: IonicShellProvider
  ) {}

}
