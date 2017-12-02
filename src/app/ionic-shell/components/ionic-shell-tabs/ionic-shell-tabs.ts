import { Component, ContentChildren, QueryList,
  forwardRef, Optional, ElementRef,
  Renderer2,  } from '@angular/core';
import { IonicShellTabComponent } from '../ionic-shell-tab/ionic-shell-tab';
import { IonicShellProvider } from '../../providers/ionic-shell';

import { RootNode, DomController, DeepLinker,
  ViewController, NavController, App,
  NavControllerBase } from 'ionic-angular';

@Component({
  selector: 'ionic-shell-tabs',
  templateUrl: 'ionic-shell-tabs.html'
})
export class IonicShellTabsComponent {

  @ContentChildren(IonicShellTabComponent) tabs: QueryList<IonicShellTabComponent>;

  private _tabs: IonicShellTabComponent[] = [];
  parent: NavControllerBase;

  transform: string;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    @Optional() parent: NavController,
    @Optional() public viewCtrl: ViewController,
    private _app: App,
    private el: ElementRef,
    private rnd: Renderer2,
    // private superTabsCtrl: SuperTabsController,
    private linker: DeepLinker,
    private domCtrl: DomController
  ) {
    this.parent = <NavControllerBase>parent;
  }

  ngOnInit(){
    this._ionicShellProvider.ionicShellTabsComponent = this;
  }

  ngAfterViewInit() {
    console.log( this.tabs );
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

  public changeTab(index: number) {
    this.transform = 'translateX(' + (index * -100) + '%)';
    /*this.tabs.toArray().forEach( (tab, i) => {
      if ( i  === index ) {
        tab.active = true;
      }else {
        tab.active = false;
      }
    });*/
  }

}
