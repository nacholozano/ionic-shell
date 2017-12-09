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
  private _indicatorTransition = 'transform 0.3s';

  private tabsScroll = {
    speed: 8, // Scroll speed if tab is not fully visible
    requestAnimationFrameReference: null, // Reference to cancel raf
    tabManaged: null, // Checking if this tab is fully visible
  };

  @ViewChildren('button') button: QueryList<any>;
  @ViewChild('indicatorHelper') indicatorHelper;
  @ViewChild('indicator') indicator;

  constructor(
    public _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef,
    _config: Config,
    private _rendered: Renderer
  ) {
    super(_config, _el, _rendered );
  }

  ngOnInit() {
    this._ionicShellProvider.tabsLabels.subscribe( tabsLabel => {
      this.tabsLabel = tabsLabel;
    });

  }

  ngAfterViewInit() {
    if ( this._ionicShellProvider.bottomTabs ) {
      this.getNativeElement().classList.add('bottom');
    }

    setTimeout(() => {
      this.ngDoCheck2();
      this.updateIndicator();
      this.indicator.nativeElement.style.transition = this._indicatorTransition;
      this.indicatorHelper.nativeElement.style.transition = this._indicatorTransition;
    }, 0);

    this._ionicShellProvider.ionicShellTabsComponent.ionSlideWillChange.subscribe( () =>{
      this.manageTabs(this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex());
      this.indicator.nativeElement.style.transition = this._indicatorTransition;
      this.indicatorHelper.nativeElement.style.transition = this._indicatorTransition;
      this.updateIndicator();
    });

    this._ionicShellProvider.ionicShellTabsComponent.ionSlideDrag.subscribe( data => {
      this.touchMove(data);
    });
  }

  ngDoCheck2(){
    this.button.toArray().forEach((button, i) => {
      const native = button.nativeElement;

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

    console.log(this._tabs);
  }

  changeTab(index: number, button) {
    this._ionicShellProvider.ionicShellTabsComponent.slideTo(index);
  }

  trimDecimals(number, decimals?){
    var numOfDecimals = decimals || 4;
    return +(number.toFixed(numOfDecimals));
  }

  tabHideLeftPart( numTab ){
    return this._tabs[ numTab ].left < this._el.nativeElement.scrollLeft;
  }

  tabHideRigthPart( numTab ){
    return this._el.nativeElement.clientWidth + this._el.nativeElement.scrollLeft < this._tabs[ numTab ].right

  }

  decreaseScroll( ){
    this._el.nativeElement.scrollLeft = this._el.nativeElement.scrollLeft - this.tabsScroll.speed;

    if( this.tabHideLeftPart( this.tabsScroll.tabManaged ) ){
      requestAnimationFrame( () => this.decreaseScroll() );
    }
  }

  increaseScroll( ){
    this._el.nativeElement.scrollLeft = this._el.nativeElement.scrollLeft + this.tabsScroll.speed;

    if( this.tabHideRigthPart( this.tabsScroll.tabManaged ) ){
      requestAnimationFrame( () => this.increaseScroll() );
    }
  }

  manageTabs( numTab ){

    if ( !this._tabs[numTab] ) { return; }

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
    if( !this._tabs[tab] ){ return; }
    this.indicatorHelper.nativeElement.style.transform = `translateX(${this._tabs[tab].marginLeft}px)`;
    this.indicator.nativeElement.style.transform  = `scaleX(${this._tabs[tab].width})`;
  }

  touchMove(event){

    if ( !this._ionicShellProvider.ionicShellTabsComponent._allowSwipeToNext && !this._ionicShellProvider.ionicShellTabsComponent._allowSwipeToPrev ) {
      return;
    }

    const index = this._ionicShellProvider.ionicShellTabsComponent.getActiveIndex();

    if( !this._tabs[index] ){
      return;
    }

    this.indicator.nativeElement.style.transition = '';
    this.indicatorHelper.nativeElement.style.transition = '';

    event = event._touches;

    if ( !(index === 0) && (event.currentX > event.startX ) ) {
      this.indicatorHelper.nativeElement.style.transform = `translateX(${ Math.floor(this._tabs[index].marginLeft - ((event.currentX - event.startX) * this._tabs[ index ].previousTabScreenRatio)) }px)`;
    } else if ( !(index === this._tabs.length-1) && ( event.currentX < event.startX ) ) {
      this.indicatorHelper.nativeElement.style.transform = `translateX(${ Math.floor(this._tabs[index].marginLeft + ((event.startX - event.currentX) * this._tabs[ index+1 ].previousTabScreenRatio )) }px)`;
    }

  }

}
