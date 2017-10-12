import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UnoPage } from '../uno/uno';
import { DosPage } from '../dos/dos';

@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uno:any = UnoPage;
  dos:any = DosPage;

  constructor(public navCtrl: NavController) {

  }

}
