import { Component, Input, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { Header } from 'ionic-angular';
import { IonicShellTabsButtonsComponent } from '../ionic-shell-tabs-buttons/ionic-shell-tabs-buttons';

@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  @ViewChild(Header) ionHeader: Header;
  @ViewChild(IonicShellTabsButtonsComponent) ionicShellTabsButtonsComponent: IonicShellTabsButtonsComponent;

  @HostBinding('style.transform')
  private _transform;

  @Input() private text: string;
  public bottomButtons: boolean;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs.subscribe( bottom => {
      this.bottomButtons = bottom;
    });

    this._ionicShellProvider.hideHeader.subscribe( hide =>{
      if( hide ) {
        this._transform = 'translateY(-' + this.ionHeader.getNativeElement().clientHeight + 'px)';
      }else{
        this._transform = 'translateY(0)';
      }
    });

  }

  ngAfterViewInit() {

    /*this._ionicShellProvider.tabsButtonsRef = this.ionicShellTabsButtonsComponent
      ? this.ionicShellTabsButtonsComponent.getNativeElement()
      : null;
    this._ionicShellProvider.headerTitleRef = this.ionHeader.getNativeElement();*/
  }

}
