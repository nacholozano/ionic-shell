import { Component, Input } from '@angular/core';
import { IonicShellProvider } from '../providers/ionic-shell';

@Component({
  selector: 'ionic-shell',
  templateUrl: 'ionic-shell.html'
})
export class IonicShellComponent {

  @Input() private bottomTabs: boolean;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) {
    console.log('Hello IonicShellComponent Component');
  }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs.next( this.bottomTabs );
  }

}
