import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { SegmentButton, Segment } from 'ionic-angular';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent {

  public tabsLabel: string[];

  @HostBinding('style.marginTop')
  private _headerHeight: string;

  @HostBinding('style.position')
  private _position: string;

  @HostBinding('style.bottom')
  private _bottom: number;

  icons;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef
  ) {
    console.log('Hello IonicShellTabsButtonsComponent Component');
  }

  ngOnInit() {
    this._ionicShellProvider.tabsLabels.subscribe( tabsLabel => {
      this.tabsLabel = tabsLabel;
    });
  }

  ngAfterViewInit() {

    this._ionicShellProvider.bottomTabs.subscribe( bottom => {
      if ( bottom ) {
        this._position = 'absolute';
        this._bottom = 0;
      }else{
        this._ionicShellProvider.headerHeight.subscribe( height => {
          this._headerHeight = height + 'px';
        });
      }
    });

    //this._ionicShellProvider.buttonsTabsHeight.next( this._el.nativeElement.clientHeight );

  }

  /*ngDoCheck() {
    if ( this._el.nativeElement.clientHeight ) {

    }
  }*/

}
