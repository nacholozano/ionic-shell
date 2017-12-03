import { Component, HostListener, HostBinding } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IonicShellProvider } from '../../app/ionic-shell/providers/ionic-shell';

/**
 * Generated class for the UnoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-uno',
  templateUrl: 'uno.html',
})
export class UnoPage {

  @HostBinding('style.paddingTop')
  private _paddingTop: string;

  @HostBinding('style.paddingBottom')
  private _paddingBottom: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private IonicShellProvider:IonicShellProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnoPage');

    this.IonicShellProvider.buttonsBottoms.subscribe( height => {
      this._paddingBottom = height + 'px';
    });

    this.IonicShellProvider.buttonsHeight.subscribe( height => {
      this._paddingTop = height - 5 + 'px';
      // 15
    });
  }

  @HostListener('scroll', ['$event.target'])
  onClick(tab) {
      var scrollTop = Math.floor(tab.scrollTop);
      var scroll = scrollTop - this.IonicShellProvider.headerScroll;

      if ( scroll < 0 && ( scroll < -this.IonicShellProvider.distanceToToggleHeader ) ) {
        // dom.tabsHeaderContainer.style.transform = 'translateY(0px)';
        this.IonicShellProvider.hideHeader.next(false);
        this.IonicShellProvider.headerScroll = scrollTop;
      }else if ( scroll > 0 && ( scroll > this.IonicShellProvider.distanceToToggleHeader ) ) {
        //dom.tabsHeaderContainer.style.transform = 'translateY(-'+header.height+'px)';
        this.IonicShellProvider.hideHeader.next(true);
        this.IonicShellProvider.headerScroll = scrollTop;
      }
  }

}
