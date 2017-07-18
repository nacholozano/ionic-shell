import { Component, Input } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';

@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  @Input() private text: string;
  public bottomButtons: boolean;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) {
    console.log('Hello IonicShellHeaderComponent Component');
  }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs.subscribe( bottom => {
      this.bottomButtons = bottom;
    });
  }

}
