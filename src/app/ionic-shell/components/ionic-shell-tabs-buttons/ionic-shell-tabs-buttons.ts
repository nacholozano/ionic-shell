import { Component, Input } from '@angular/core';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent {

  @Input() tabsLabel: string[];

  constructor() {
    console.log('Hello IonicShellTabsButtonsComponent Component');
  }

}
