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
  @ContentChild(Menu) menu: Menu;
  @ContentChild(IonicShellHeaderComponent) header: IonicShellHeaderComponent;
  @ViewChild(IonicShellTabsButtonsComponent) buttons: IonicShellTabsButtonsComponent;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) { }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs = this.bottomTabs;
  }

  ngAfterViewInit(){

    this.menu.ionDrag.subscribe( () => {
      this._ionicShellProvider.ionicShellTabsComponent.lockSwipes(true);
    });

    this.menu.ionClose.subscribe( () => {
      this._ionicShellProvider.ionicShellTabsComponent.lockSwipes(false);
    });

    setTimeout(() => {
      this._ionicShellProvider.headerTitleRefHeightSubject.next( this.header.ionHeader.getNativeElement().clientHeight );

      if ( this.header.ionicShellTabsButtonsComponent ) {
        this._ionicShellProvider.tabsButtonsRefHeightSubject.next( this.header.ionicShellTabsButtonsComponent.getNativeElement().clientHeight );
      }else if ( this.buttons ) {
        this._ionicShellProvider.tabsButtonsRefHeightSubject.next( this.buttons.getNativeElement().clientHeight );
      }

      if( this.menu && this.header ) {
        this.header.hasMenu = true;
      }
    });
  }

}
