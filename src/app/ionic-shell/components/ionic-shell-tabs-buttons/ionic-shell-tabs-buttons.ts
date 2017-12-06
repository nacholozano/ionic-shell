import { Component, Input, HostBinding, ElementRef, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { SegmentButton, Segment, Button } from 'ionic-angular';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent {

  public tabsLabel: string[];
  private _tabs = [];

  private tabsScroll = {
    speed: 10, // Scroll speed if tab is not fully visible
    requestAnimationFrameReference: null, // Reference to cancel raf
    tabManaged: null, // Checking if this tab is fully visible
    equalTabs: false, // All tabs have equal width
    equalWdith: null
  };

  @ViewChild('buttons') buttons;
  @ViewChildren('button') button: QueryList<any>;

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

    // console.log(this.button);

  }

  ngDoCheck(){
    if( this.button && !this._tabs.length ){
      // console.log(this.button);
      console.log( this.button.toArray() );
      // this._tabs = this.button.toArray();
      this.button.toArray().forEach((button, i) => {
        const native = button.getNativeElement();

        var tab: any = {
          id: i,
          width: this.trimDecimals(native.getBoundingClientRect().width),
          translate: i * -100,
        };
        tab.center = this.trimDecimals(tab.width/2);

        if( i ){
          tab.left = this._tabs[i-1].right;
          tab.right = this.trimDecimals(tab.left + tab.width);
          // tab.translatePX = -( tabsViews.containerWdith + Math.abs(tabsData[ index - 1 ].translatePX) );
        }else{
          tab.left = 0;
          tab.right = tab.width;
          tab.translatePX = 0;
        }

        tab.marginLeft = tab.left + tab.center;

        if( this._tabs[i - 1] ){
          // tab.previousTabScreenRatio = (tab.marginLeft - tabsData[index-1].marginLeft) / tabsViews.containerWdith;
        }

        this._tabs.push(tab);

      });
    }
  }

  changeTab(index: number, button) {
    this._ionicShellProvider.ionicShellTabsComponent.slideTo(index);
    this.manageTabs(index);
  }

  trimDecimals(number, decimals?){
    var numOfDecimals = decimals || 4;
    return +(number.toFixed(numOfDecimals));
  }

  tabHideLeftPart( numTab ){
    return this._tabs[ numTab ].left < this._el.nativeElement.scrollLeft;
  }

  tabHideRigthPart( numTab ){
    return this._el.nativeElement.clientWidth+this._el.nativeElement.scrollLeft < this._tabs[ numTab ].right
  }

  decreaseScroll( ){
    const x = 5 + 6;
    this._el.nativeElement.scrollLeft = this._el.nativeElement.scrollLeft - this.tabsScroll.speed;

    if( this.tabHideLeftPart( this.tabsScroll.tabManaged ) ){
      requestAnimationFrame( () => this.decreaseScroll() );
    }
  }

  increaseScroll( ){
    const x = 5 + 6;
    this._el.nativeElement.scrollLeft = this._el.nativeElement.scrollLeft + this.tabsScroll.speed;

    if( this.tabHideRigthPart( this.tabsScroll.tabManaged ) ){
      requestAnimationFrame( () => this.increaseScroll() );
    }
  }

  manageTabs( numTab ){

    // if( tabsScroll.equalTabs ){ return; }

    this.tabsScroll.tabManaged = numTab;

    cancelAnimationFrame(this.tabsScroll.requestAnimationFrameReference);

    if ( this.tabHideLeftPart(numTab) ){
      this.tabsScroll.requestAnimationFrameReference = requestAnimationFrame( () => this.decreaseScroll() );
    }else if( this.tabHideRigthPart(numTab) ){
      this.tabsScroll.requestAnimationFrameReference = requestAnimationFrame( () => this.increaseScroll() );
    }

    if( numTab > 0 && this.tabHideLeftPart( numTab-1 ) ){

      cancelAnimationFrame(this.tabsScroll.requestAnimationFrameReference)
      this.tabsScroll.tabManaged = numTab-1;

      this.tabsScroll.requestAnimationFrameReference = requestAnimationFrame( () => this.decreaseScroll() );

    }else if( numTab < this._tabs.length-1 && this.tabHideRigthPart( numTab+1 ) ){

      cancelAnimationFrame(this.tabsScroll.requestAnimationFrameReference)
      this.tabsScroll.tabManaged = numTab+1;

      this.tabsScroll.requestAnimationFrameReference = requestAnimationFrame( () => this.increaseScroll() );
    }
  }

}
