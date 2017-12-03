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
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ionic-shell-tab',
  templateUrl: 'ionic-shell-tab.html'
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

  @ViewChild('viewport') v2;
  /*set _vp2(val) {
    if ( val.nativeElement ) {
      Observable.fromEvent( val.nativeElement, 'scroll' )
      .subscribe( () => {
        console.log('ayer');
      });
    }
    // console.log( val );
  }*/

  @ViewChild('viewport', {read: ViewContainerRef})
  set _vp(val: ViewContainerRef) {
    this.setViewport(val);

    /*Observable.fromEvent( val, 'scroll' )
    .subscribe( () => {
      console.log('ayer');
    });*/
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
    // console.log('Hello IonicShellTabComponent Component');
  }

  ngAfterViewInit() {
    this.load(true);

    /*this._ionicShellProvider.buttonsHeight.subscribe( height => {
      this._paddingTop = height + 15 + 'px';
      const c = 5 +7 ;
    });

    this._ionicShellProvider.buttonsBottoms.subscribe( height => {
      this._paddingBottom = height + 15 + 'px';
    });*/


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
