import { Component, ContentChildren, QueryList } from '@angular/core';
import { IonicShellTabComponent } from '../ionic-shell-tab/ionic-shell-tab';
import { IonicShellProvider } from '../../providers/ionic-shell';

@Component({
  selector: 'ionic-shell-tabs',
  templateUrl: 'ionic-shell-tabs.html'
})
export class IonicShellTabsComponent {

  @ContentChildren(IonicShellTabComponent) tabs: QueryList<IonicShellTabComponent>;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) {
    console.log('Hello IonicShellTabsComponent Component');
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

}
