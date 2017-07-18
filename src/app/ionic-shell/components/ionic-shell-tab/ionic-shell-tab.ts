import { Component, Input } from '@angular/core';

@Component({
  selector: 'ionic-shell-tab',
  templateUrl: 'ionic-shell-tab.html'
})
export class IonicShellTabComponent {

  @Input() text: string;

  constructor() {
    console.log('Hello IonicShellTabComponent Component');
  }

}
