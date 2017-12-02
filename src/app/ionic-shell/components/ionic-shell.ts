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
  }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs.next( this.bottomTabs );
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this._ionicShellProvider.buttonsHeight.next( this._ionicShellProvider._headerRef.clientHeight );
      if ( this._ionicShellProvider._buttonsRef ) {
        this._ionicShellProvider.buttonsBottoms.next( this._ionicShellProvider._buttonsRef.clientHeight );
      }
    });
  }

}
