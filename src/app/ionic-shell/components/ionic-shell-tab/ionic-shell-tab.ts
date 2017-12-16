import { Component, Input, HostBinding,
  ErrorHandler, NgZone, ElementRef,
  Renderer, ComponentFactoryResolver, ChangeDetectorRef, Optional,
  forwardRef, Inject, ViewContainerRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { NavControllerBase, App, Config,
  Platform, DomController, DeepLinker, GestureController,
  RootNode, NavOptions } from 'ionic-angular';

import { IonicShellProvider } from '../../providers/ionic-shell';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { IonicShellTabsComponent } from '../ionic-shell-tabs/ionic-shell-tabs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ionic-shell-tab',
  templateUrl: 'ionic-shell-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IonicShellTabComponent extends NavControllerBase {

  @Input() public text: string;
  @Input() root: any;
  @ViewChild('tabReloaderContainer') tabReloaderContainer;
  @ViewChild('tabReloaderIcon') tabReloaderIcon;

  _num;

  /**
   * Indicates whether the tab has been loaded
   * @type {boolean}
   */
  private loaded: boolean = false;
  private ionicPage: any;

  @ViewChild('viewport', {read: ViewContainerRef})
  set _vp(val: ViewContainerRef) {
    this.setViewport(val);
  }

  @ViewChild('viewport', {read: ElementRef}) c;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    @Inject(forwardRef(() => IonicShellTabsComponent))
    parent: IonicShellTabsComponent,
    app: App,
    config: Config,
    plt: Platform,
    elementRef: ElementRef,
    zone: NgZone,
    renderer: Renderer,
    cfr: ComponentFactoryResolver,
    private _cd: ChangeDetectorRef,
    gestureCtrl: GestureController,
    transCtrl: TransitionController,
    @Optional() private linker: DeepLinker,
    private _dom: DomController,
    errHandler: ErrorHandler,
    private _viewContainerRef: ViewContainerRef
  ) {
    super(parent, app, config, plt, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler);
    renderer.setElementClass(elementRef.nativeElement, 'swiper-slide', true);
    parent.update(10);
  }

  ngAfterViewInit() {
    this.load(true);
    setTimeout(()=>{
      this.ionicPage = this.c.nativeElement.nextSibling;

      Observable
      .fromEvent(this.ionicPage, 'scroll')
      .debounceTime(3)
      .subscribe( () => {
        this.onScroll();
      });

      let v = 0;
      this._ionicShellProvider.headerTitleRefHeightSubject.subscribe( height => {
        this.ionicPage.style.paddingTop = `${height}px`;
        v = height;
      });

      this._ionicShellProvider.tabsButtonsRefHeightSubject.subscribe( height => {
        if ( !this._ionicShellProvider.bottomTabs ) {
          this.ionicPage.style.paddingTop = `${height+v}px`;
        }else {
          this.ionicPage.style.paddingBottom = `${height}px`;
        }
      });
    }, 0);
  }

  ngOnInit() {
    this.parent.addTab(this);

    this._num = this._ionicShellProvider.pagesTempCounterID;
    this._ionicShellProvider.pagesTempCounterID++;

    this.parent.ionSlideWillChange.subscribe(data => {
      if ( data.realIndex !== this._num ){ return; }
      let h;
      this._ionicShellProvider.tabsButtonsRefHeightSubject.subscribe(c => {
        h = c;
      });
      if ( this.ionicPage.scrollTop < h ) {
        this._ionicShellProvider.headerComponentRef.setTranslateY(0);
      }
      this._ionicShellProvider.headerScroll = Math.floor(this.ionicPage.scrollTop);
    });
  }

  public load(load: boolean) {
    if (load && !this.loaded) {
      this.push(this.root, {}, { animate: false });
      this.loaded = true;
    }
  }

  goToRoot(opts: NavOptions): Promise<any> | any {
    return this.setRoot(this.root, {}, opts, null);
  }

  ngOnDestroy() {
    this.parent.update(10);
  }

  onScroll() {
    var scrollTop = this.ionicPage.scrollTop;
    var scroll = scrollTop - this._ionicShellProvider.headerScroll;

    if ( scrollTop < 1 || (scroll < 0 && (scroll < -this._ionicShellProvider.distanceToToggleHeader))) {
      this._ionicShellProvider.hideHeader.next(false);
      this._ionicShellProvider.headerScroll = scrollTop;
    }else if ( scroll > 0 && (scroll > this._ionicShellProvider.distanceToToggleHeader)) {
      this._ionicShellProvider.hideHeader.next(true);
      this._ionicShellProvider.headerScroll = scrollTop;
    }
  }

  /*startRefresh(){
    this.tabReloaderContainer.nativeElement.style.transition = '';
    this.tabReloaderIcon.nativeElement.style.transition = '';
  }*/

  /*moveRefresh(e){

    if( !requestForTab[ tabsViews.currentTab ] || state.sliding ){
      return;
    }

    if( state.refreshing ){
      e.preventDefault();
    }

    if( dom.tabsArray[ tabsViews.currentTab ].scrollTop === 0 ){
      if( !refresh.startPoint ){
        refresh.startPoint = e.touches[0].clientY;
      }

      if( e.touches[0].clientY-refresh.startPoint <= 180 + touch.offset &&
          e.touches[0].clientY > refresh.startPoint + touch.offset ){

        e.preventDefault();
        state.refreshing = true;

        refresh.currentPoint = Math.floor(e.touches[0].clientY-refresh.startPoint - touch.offset);

        dom.tabReloaderContainer.style.transform = "translateY("+refresh.currentPoint+"px)";
        dom.tabReloaderIcon.style.transform = "rotate("+refresh.currentPoint*2+"deg)";

        if( refresh.currentPoint > 90 ){
          dom.tabReloaderIcon.classList.add('ready-for-reload');
        }else{
          dom.tabReloaderIcon.classList.remove('ready-for-reload');
        }

      }
    }else{
      refresh.startPoint = null;
      state.refreshing = false;
    }
  }*/

}
