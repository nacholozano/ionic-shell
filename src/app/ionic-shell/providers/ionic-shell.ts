import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { IonicShellHeaderComponent } from '../components/ionic-shell-header/ionic-shell-header';
import { IonicShellTabsComponent } from '../components/ionic-shell-tabs/ionic-shell-tabs';

@Injectable()
export class IonicShellProvider {

  a;
  tabsLabels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Buttons for change tab are at the bottom of the app.
   *
   * @type {boolean}
   * @memberof IonicShellProvider
   */
  bottomTabs: boolean;

  /**
   * Reference of IonicShellTabsComponent
   *
   * @type {IonicShellTabsComponent}
   * @memberof IonicShellProvider
   */
  ionicShellTabsComponent: IonicShellTabsComponent;

  /**
   * Variable to toggle header.
   *
   * @type {BehaviorSubject<boolean>}
   * @memberof IonicShellProvider
   */
  hideHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  headerScroll: number = 0;

  /**
   * Scroll distance to toggle header.
   *
   * @type {number}
   * @memberof IonicShellProvider
   */
  distanceToToggleHeader: number = 30;

  /**
   * Temporal counter to identificate each page with respective tab.
   * IonicShellPage use this internally.
   *
   * @memberof IonicShellProvider
   */
  pagesTempCounterID = 0;

  /**
   * Container of button' height.
   *
   * @type {BehaviorSubject<number>}
   * @memberof IonicShellProvider
   */
  tabsButtonsRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   *
   *
   * @type {BehaviorSubject<number>}
   * @memberof IonicShellProvider
   */
  headerTitleRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * Reference of IonicShellHeaderComponent
   *
   * @type {IonicShellHeaderComponent}
   * @memberof IonicShellProvider
   */
  headerComponentRef: IonicShellHeaderComponent;

}
