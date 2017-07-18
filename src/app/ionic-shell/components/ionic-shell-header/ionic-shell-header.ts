import { Component, Input } from '@angular/core';

/**
 * Generated class for the IonicShellHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  @Input() text: string;

  constructor() {
    console.log('Hello IonicShellHeaderComponent Component');
  }

}
