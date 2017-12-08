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

  @HostBinding('style.paddingTop')
  private _paddingTop: string;

  @HostBinding('style.paddingBottom')
  private _paddingBottom: string;

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
  ) {
    super(parent, app, config, plt, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler);
    renderer.setElementClass(elementRef.nativeElement, 'swiper-slide', true);
    parent.update(10);
  }

  ngAfterViewInit() {
    this.load(true);
  }

  ngOnInit() {
    this.parent.addTab(this);
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

}
