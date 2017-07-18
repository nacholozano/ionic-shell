import { Component, Input } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent {

  //@Input() tabsLabel: string[];

  public tabsLabel: string[];

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) {
    console.log('Hello IonicShellTabsButtonsComponent Component');
  }

  ngOnInit() {
    this._ionicShellProvider.tabsLabels.subscribe( tabsLabel => {
      this.tabsLabel = tabsLabel;
    });
  }

}
