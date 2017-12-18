import { Component, ContentChildren, QueryList,
  forwardRef, Optional, ElementRef,
  Renderer2, NgZone, Renderer, ChangeDetectionStrategy, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
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

    console.log('pafre-tabs', this);
  }

  ngOnInit(){
    this._wrapper = (this.getNativeElement().children[0].querySelector('.swiper-wrapper'));
    this._ionicShellProvider.ionicShellTabsComponent = this;
    this.pager = false;
    //this.lockSwipes(true);
  }

  ngAfterViewInit() {
    this._populateTabsButtons();

    /* this.ionSlideDidChange.subscribe( () => {
      this.updateIndicator();
    }); */

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
    this._ionicShellProvider.a.indicator.nativeElement.style.transition = 'transform 0.3s';
    this._ionicShellProvider.a.indicatorHelper.nativeElement.style.transition = 'transform 0.3s';
    this._ionicShellProvider.a.updateIndicator();
    // this.ionSlideWillChange.emit(this);
  }

}
