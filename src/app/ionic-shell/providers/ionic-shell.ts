import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { IonicShellHeaderComponent } from '../components/ionic-shell-header/ionic-shell-header';

@Injectable()
export class IonicShellProvider {

  public tabsLabels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public bottomTabs: boolean;

  public ionicShellTabsComponent;

  public hideHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public headerScroll = 0;
  public distanceToToggleHeader = 30;

  pagesTempCounterID = 0;

  tabsButtonsRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  headerTitleRefHeightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  headerComponentRef: IonicShellHeaderComponent;

  constructor() {
  }

}
