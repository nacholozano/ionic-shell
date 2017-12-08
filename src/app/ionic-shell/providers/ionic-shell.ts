import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { IonicShellHeaderComponent } from '../components/ionic-shell-header/ionic-shell-header';

@Injectable()
export class IonicShellProvider {

  tabsLabels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  bottomTabs: boolean;

  ionicShellTabsComponent;

  hideHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  headerScroll = 0;
  distanceToToggleHeader = 30;

  pagesTempCounterID = 0;
  tabsButtonsRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  headerTitleRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  headerComponentRef: IonicShellHeaderComponent;

  constructor() {
  }

}
