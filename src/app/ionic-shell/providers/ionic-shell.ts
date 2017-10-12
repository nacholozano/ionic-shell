import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class IonicShellProvider {

  public tabsLabels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public bottomTabs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public headerHeight: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  /*public buttonsTabsHeight: BehaviorSubject<number> = new BehaviorSubject<number>(0); */

  constructor() {
    /*public http: Http*/
    console.log('Hello IonicShellProvider Provider');
  }

}
