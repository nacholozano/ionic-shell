import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic popover</ion-list-header>
      <button ion-item (click)="popOverItemClick(1)">Dos</button>
      <button ion-item (click)="popOverItemClick(4)">Cinco</button>
      <button ion-item (click)="popOverItemClick(11)">Doce</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    private _ionicShellProvider: IonicShellProvider
  ) {}

  popOverItemClick(index: number) {
    this.viewCtrl.dismiss();
    this._ionicShellProvider.ionicShellTabsComponent.slideTo(index);
  }

}
