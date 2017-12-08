import { Component, Input, ContentChild, ViewChild } from '@angular/core';
import { IonicShellProvider } from '../providers/ionic-shell';
import { IonicShellHeaderComponent } from './ionic-shell-header/ionic-shell-header';
import { IonicShellTabsButtonsComponent } from './ionic-shell-tabs-buttons/ionic-shell-tabs-buttons';
import { Menu } from 'ionic-angular';

@Component({
  selector: 'ionic-shell',
  templateUrl: 'ionic-shell.html'
})
export class IonicShellComponent {

  @Input() private bottomTabs: boolean;

  @ContentChild(Menu) m: Menu;
  @ContentChild(IonicShellHeaderComponent) h: IonicShellHeaderComponent;
  @ViewChild(IonicShellTabsButtonsComponent) b: IonicShellTabsButtonsComponent;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) { }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs = this.bottomTabs;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this._ionicShellProvider.headerTitleRefHeightSubject.next( this.h.ionHeader.getNativeElement().clientHeight );

      if ( this.h.ionicShellTabsButtonsComponent ) {
        this._ionicShellProvider.tabsButtonsRefHeightSubject.next( this.h.ionicShellTabsButtonsComponent.getNativeElement().clientHeight );
      }else if ( this.b ) {
        this._ionicShellProvider.tabsButtonsRefHeightSubject.next( this.b.getNativeElement().clientHeight );
      }

      if( this.m && this.h ) {
        this.h.hasMenu = true;
      }
    });
  }

}
