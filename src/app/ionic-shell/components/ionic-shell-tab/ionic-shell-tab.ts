import { Component, Input, HostBinding,
  ErrorHandler, NgZone, ElementRef,
  Renderer, ComponentFactoryResolver, ChangeDetectorRef, Optional,
  forwardRef, Inject, ViewContainerRef, ViewChild } from '@angular/core';

import { NavControllerBase, App, Config,
  Platform, DomController, DeepLinker, GestureController,
  RootNode, NavOptions } from 'ionic-angular';

import { IonicShellProvider } from '../../providers/ionic-shell';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { IonicShellTabsComponent } from '../ionic-shell-tabs/ionic-shell-tabs';

// import { ChangeDetectorRef, Component, ComponentFactoryResolver,
  /* ComponentRef, ElementRef, ErrorHandler, EventEmitter,
  Input, NgZone, Optional, Output, Renderer, ViewChild,
  ViewContainerRef, ViewEncapsulation } from '@angular/core'; */

/* import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { Tab as ITab } from '../../navigation/nav-interfaces';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { NavOptions } from '../../navigation/nav-util';
import { Platform } from '../../platform/platform';
import { TabButton } from './tab-button';
import { Tabs } from './tabs';
import { TransitionController } from '../../transitions/transition-controller';
import { ViewController } from '../../navigation/view-controller'; */

@Component({
  selector: 'ionic-shell-tab',
  templateUrl: 'ionic-shell-tab.html',
  /* providers: [
    {
      provide: RootNode,
      useExisting: forwardRef(() => IonicShellTabsComponent)
    }
  ] */
})
export class IonicShellTabComponent extends NavControllerBase {

  @Input() public text: string;
  @Input() root: any;

  /* private _paddingDefault: number = 10;

  @HostBinding('style.paddingTop')
  private _paddingTop: string = this._paddingDefault + 'px';

  @HostBinding('style.paddingBottom')
  private _paddingBottom: string = this._paddingDefault + 'px';

  private _headerHeight: number = 0;
  private _buttonTabsHeight: number = 0; */

  /**
   * Indicates whether the tab has been loaded
   * @type {boolean}
   */
  private loaded: boolean = false;

  @ViewChild('viewport', {read: ViewContainerRef})
  set _vp(val: ViewContainerRef) {
    this.setViewport(val);
  }

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    //@Inject(forwardRef(() => ParentComponent)) private _parent:ParentComponent
    @Inject(forwardRef(() => IonicShellTabsComponent)) parent: IonicShellTabsComponent,
    // parent: IonicShellTabsComponent,
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
    errHandler: ErrorHandler
  ) {
    super(parent, app, config, plt, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler);
    console.log('Hello IonicShellTabComponent Component');
  }

  ngAfterViewInit() {
    this.load(true);
    /* this._ionicShellProvider.headerHeight.subscribe( headerHeight => {
      this._headerHeight = headerHeight;
      this._paddingTop = this._paddingDefault + headerHeight + 'px';
    });
    this._ionicShellProvider.bottomTabs.subscribe( bottom => {
      this._ionicShellProvider.buttonsTabsHeight.subscribe( buttonsTabsHeight => {
        if ( bottom ) {
          this._paddingBottom = buttonsTabsHeight + 'px';
        }else {
          this._paddingTop = buttonsTabsHeight + this._headerHeight + this._paddingDefault + 'px';
        }
      });
    }); */
  }

  ngOnInit() {
    this.parent.addTab(this);
    console.log( 'root', this.root );
  }

  public load(load: boolean) {
    if (load && !this.loaded) {
      /* this.init.then(() => { */
      this.push(this.root, {}, { animate: false });
      this.loaded = true;
      /* }); */
    }
  }

  goToRoot(opts: NavOptions): Promise<any> | any {
    return this.setRoot(this.root, {}, opts, null);
  }

}
