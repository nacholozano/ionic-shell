import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';
import { IonicShellPage } from '../../app/ionic-shell/components/ionic-shell-page';

@Component({
  selector: 'page-uno',
  templateUrl: 'uno.html',
})
export class UnoPage extends IonicShellPage {

  constructor(
    protected injector: Injector
  ) {
    super(injector);
  }

}
