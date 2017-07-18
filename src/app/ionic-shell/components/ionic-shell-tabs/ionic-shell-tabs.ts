import { Component } from '@angular/core';

/**
 * Generated class for the IonicShellTabsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ionic-shell-tabs',
  templateUrl: 'ionic-shell-tabs.html'
})
export class IonicShellTabsComponent {

  text: string;

  constructor() {
    console.log('Hello IonicShellTabsComponent Component');
    this.text = 'Hello World';
  }

}
