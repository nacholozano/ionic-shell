import { Component, Input, ViewChild } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';

@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  @ViewChild('ionHeader') ionHeader;

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

  ngAfterViewInit() {
    this._ionicShellProvider.headerHeight.next( this.ionHeader.nativeElement.clientHeight );
  }

}
