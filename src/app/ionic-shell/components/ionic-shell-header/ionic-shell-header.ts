import { Component, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { Header } from 'ionic-angular';
import { IonicShellTabsButtonsComponent } from '../ionic-shell-tabs-buttons/ionic-shell-tabs-buttons';

@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  hasMenu: boolean;

  @ViewChild(Header) ionHeader: Header;
  @ViewChild(IonicShellTabsButtonsComponent) ionicShellTabsButtonsComponent: IonicShellTabsButtonsComponent;

  @HostBinding('style.transform')
  transform;

  @Input() private text: string;
  public bottomButtons: boolean;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    this.bottomButtons = this._ionicShellProvider.bottomTabs;

    this._ionicShellProvider.hideHeader.subscribe( hide =>{
      if( hide ) {
        this.transform = 'translateY(-' + this.ionHeader.getNativeElement().clientHeight + 'px)';
      }else{
        this.transform = 'translateY(0)';
      }
    });

    this._ionicShellProvider.headerComponentRef = this;
  }

}
