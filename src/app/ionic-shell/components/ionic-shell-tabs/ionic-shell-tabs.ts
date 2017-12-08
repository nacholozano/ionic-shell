import { Component, ContentChildren, QueryList,
  forwardRef, Optional, ElementRef,
  Renderer2, NgZone, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { IonicShellTabComponent } from '../ionic-shell-tab/ionic-shell-tab';
import { IonicShellProvider } from '../../providers/ionic-shell';

import { RootNode, DomController, DeepLinker,
  ViewController, NavController, App,
  NavControllerBase, Slides } from 'ionic-angular';

  import { Config } from 'ionic-angular';
  import { Platform } from 'ionic-angular';

@Component({
  selector: 'ionic-shell-tabs',
  templateUrl: 'ionic-shell-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IonicShellTabsComponent extends Slides {

  @ContentChildren(IonicShellTabComponent) tabs: QueryList<IonicShellTabComponent>;

  private _tabs: IonicShellTabComponent[] = [];
  parent: NavControllerBase;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    @Optional() parent: NavController,
    @Optional() public viewCtrl: ViewController,
    private _app: App,
    private el: ElementRef,
    private rnd: Renderer2,
    private linker: DeepLinker,
    private domCtrl: DomController,

    config: Config,
    private _plat: Platform,
    zone: NgZone,
    elementRef: ElementRef,
    renderer: Renderer,
  ) {
    super(
      config,
      _plat,
      zone,
      viewCtrl,
      el,
      renderer
    );
    this.parent = <NavControllerBase>parent;
  }

  ngOnInit(){
    this._wrapper = (this.getNativeElement().children[0].querySelector('.swiper-wrapper'));
    this._ionicShellProvider.ionicShellTabsComponent = this;
    this.pager = false;

    this.lockSwipeToPrev(true);
    this.ionSlideDidChange.subscribe( () => {
      this._lockSwipe();
    });
  }

  ngAfterViewInit() {
    this._populateTabsButtons();
  }

  private _populateTabsButtons(): void {
    const tabs = [];
    this.tabs.toArray().forEach( tab => {
      tabs.push( tab.text );
    });
    this._ionicShellProvider.tabsLabels.next(tabs);
  }

  public addTab(tab: IonicShellTabComponent ): void {
    this._tabs.push(tab);
  }

  public updateIndicator(){
    this.ionSlideWillChange.emit(this);
  }

  private _lockSwipe(){
    if ( this.isBeginning() ){
      this.lockSwipeToPrev(true);
      this.lockSwipeToNext(false);
    }else if ( this.isEnd() ) {
      this.lockSwipeToNext(true);
      this.lockSwipeToPrev(false);
    }else {
      this.lockSwipeToPrev(false);
      this.lockSwipeToNext(false);
    }
  }

}
