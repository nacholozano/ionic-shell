import { Component, Input, HostBinding, ElementRef, ViewChild, ContentChildren, QueryList, ViewChildren, Renderer } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { SegmentButton, Segment, Button, Ion, Config } from 'ionic-angular';
import { HostListener } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'ionic-shell-tabs-buttons',
  templateUrl: 'ionic-shell-tabs-buttons.html'
})
export class IonicShellTabsButtonsComponent extends Ion {

  public tabsLabel: string[];
  private _tabs = [];

  private tabsScroll = {
    speed: 10, // Scroll speed if tab is not fully visible
    requestAnimationFrameReference: null, // Reference to cancel raf
    tabManaged: null, // Checking if this tab is fully visible
    equalTabs: false, // All tabs have equal width
    equalWdith: null
  };

  @ViewChildren(Button) button: QueryList<Button>;

  @ViewChild('indicatorHelper') indicatorHelper;
  @ViewChild('indicator') indicator;

  @HostBinding('style.position')
  private _position: string;

  @HostBinding('style.bottom')
  private _bottom: number;

  @HostBinding('style.zIndex')
  private _zindex: number;

  icons;

  constructor(
    public _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef,
    _config: Config,
    private _rendered: Renderer
  ) {
    super(_config, _el, _rendered );
    /*this._config = config;
    this._elementRef = elementRef;
    this._renderer = renderer;*/
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
        this._zindex = 150;

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

  }

  ngDoCheck2(){
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

    const index = this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex();
    event = event._touches;

    if ( !(index === 0) && (event.currentX > event.startX ) ) {
      this.indicatorHelper.nativeElement.style.transform = "translateX("+ Math.floor(this._tabs[index].marginLeft - ( (event.currentX - event.startX) * this._tabs[ index ].previousTabScreenRatio) )+"px)";
    } else if ( !(index === this._tabs.length-1) && ( event.currentX < event.startX ) ) {
      this.indicatorHelper.nativeElement.style.transform = "translateX(" + Math.floor( this._tabs[index].marginLeft + ( ( event.startX - event.currentX ) * this._tabs[ index+1 ].previousTabScreenRatio ) ) +"px)";
    }

  }

}
