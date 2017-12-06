import { Component, Input, HostBinding, ElementRef, ViewChild, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { SegmentButton, Segment, Button } from 'ionic-angular';
import { HostListener } from '@angular/core/src/metadata/directives';

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

  @ViewChild('indicatorHelper') indicatorHelper;
  @ViewChild('indicator') indicator;

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
    // ionSlideDidChange
    this._ionicShellProvider.ionicShellTabsComponent.ionSlideWillChange.subscribe( () =>{
      this.manageTabs(this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex());
      this.indicator.nativeElement.style.transition = 'transform 0.3s';
      this.indicatorHelper.nativeElement.style.transition = 'transform 0.3s';
      this.updateIndicator();
    });

    this._ionicShellProvider.ionicShellTabsComponent.ionSlideDrag.subscribe( data => {
      console.log(data);
      this.touchMove(data);
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

    setTimeout(() => {
      this.ngDoCheck2();
      this.updateIndicator();
      this.indicator.nativeElement.style.transition = 'transform 0.3s';
      this.indicatorHelper.nativeElement.style.transition = 'transform 0.3s';
    }, 0);

    // console.log(this.button);

  }

  ngDoCheck2(){
    // if( this.button && !this._tabs.length ){
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
          tab.translatePX = -( document.body.clientWidth + Math.abs(this._tabs[ i - 1 ].translatePX) );
        }else{
          tab.left = 0;
          tab.right = tab.width;
          tab.translatePX = 0;
        }

        tab.marginLeft = tab.left + tab.center;

        if( this._tabs[i - 1] ){
          tab.previousTabScreenRatio = (tab.marginLeft - this._tabs[i-1].marginLeft) / document.body.clientWidth;
        }

        this._tabs.push(tab);

      });
    //}
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

  updateIndicator(){

    const tab = this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex() || 0;

    this.indicatorHelper.nativeElement.style.transform = "translateX(" + this._tabs[tab].marginLeft + "px)";
    this.indicator.nativeElement.style.transform  = "scaleX("+ this._tabs[tab].width  +")";
  }

  touchMove(event){

    this.indicator.nativeElement.style.transition = '';
    this.indicatorHelper.nativeElement.style.transition = '';

    // touch.endPosition = event.touches[0].clientX;
    /*currentX
    currentY
    diff
    startX
    startY*/

    // if ( !leftLimit() && (event.touches[0].clientX > touch.startPosition + touch.offset) ) {
    const index = this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex();

    event = event._touches;

    /*console.log(event.currentX);
    console.log(event.startX);
    console.log( event.currentX < event.startX );*/

    if ( !(index === 0) && (event.currentX > event.startX ) ) {

      // event.preventDefault();
      // state.sliding = true;

      // var nexTab = dom.tabsArray[ tabsViews.currentTab + -1 ];

      // touch.move = event.touches[0].clientX - touch.offset - touch.startPosition;
      // dom.tabsMove.style.transform = "translateX(" + Math.floor(tabsData[ tabsViews.currentTab ].translatePX + touch.move) + "px)";

      this.indicatorHelper.nativeElement.style.transform = "translateX("+ Math.floor(this._tabs[index].marginLeft - ( (event.currentX - event.startX) * this._tabs[ index ].previousTabScreenRatio) )+"px)";

    // } else if ( !rightLimit() && ( event.touches[0].clientX < touch.startPosition - touch.offset ) ) {
    } else if ( !(index === this._tabs.length-1) && ( event.currentX < event.startX ) ) {

      // event.preventDefault();
      // state.sliding = true;

      // var nexTab = dom.tabsArray[ tabsViews.currentTab + 1 ];

      // touch.move = touch.startPosition - event.touches[0].clientX - touch.offset;
      // dom.tabsMove.style.transform = "translateX(" + Math.floor(tabsData[ tabsViews.currentTab ].translatePX - touch.move) + "px)";
      this.indicatorHelper.nativeElement.style.transform = "translateX(" + Math.floor( this._tabs[index].marginLeft + ( ( event.startX - event.currentX ) * this._tabs[ index+1 ].previousTabScreenRatio ) ) +"px)";
    }

  }

}
