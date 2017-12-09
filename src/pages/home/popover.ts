import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Ionic popover</ion-list-header>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
