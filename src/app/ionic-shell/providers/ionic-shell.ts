import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class IonicShellProvider {

  public tabsLabels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public bottomTabs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public ionicShellTabsComponent;

  public hideHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public headerScroll = 0;
  public distanceToToggleHeader = 30;

  num = 0;
  headerref;

  // tabsButtonsRef;
  tabsButtonsRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // headerTitleRef;
  headerTitleRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
  }

}
