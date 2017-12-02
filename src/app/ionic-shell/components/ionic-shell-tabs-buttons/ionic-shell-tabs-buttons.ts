import { Component, Input, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { SegmentButton, Segment } from 'ionic-angular';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent {

  public tabsLabel: string[];

  @ViewChild('buttons') buttons;

  /*@HostBinding('style.paddingTop')
  private _headerHeight: string;*/

  @HostBinding('style.position')
  private _position: string;

  @HostBinding('style.bottom')
  private _bottom: number;

  icons;

  constructor(
    public _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef
  ) {
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
        this._ionicShellProvider._buttonsRef = this.buttons.nativeElement;
      }
      /*else{
        this._ionicShellProvider.headerHeight.subscribe( height => {
          this._headerHeight = height + 'px';
        });
      }*/

    });

  }

}
