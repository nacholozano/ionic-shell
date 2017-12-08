import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IonicShellProvider } from '../providers/ionic-shell';

// @IonicPage()
@Component({
  selector: 'ionic-shell-page',
  template: '',
})
export class IonicShellPage {

  num;

  public navCtrl: NavController;
  public navParams: NavParams;
  protected IonicShellProvider:IonicShellProvider;
  protected _el: ElementRef;

  constructor(
    protected injector: Injector
  ) {
    this.navCtrl = injector.get(NavController);
    this.navParams = injector.get(NavParams);
    this.IonicShellProvider = injector.get(IonicShellProvider);
    this._el = injector.get(ElementRef);
  }

  ngOnInit(){
    this.IonicShellProvider.ionicShellTabsComponent.ionSlideWillChange.subscribe(data => {
      if ( data.realIndex !== this.num ){ return; }
      let h;
      this.IonicShellProvider.tabsButtonsRefHeightSubject.subscribe(c => {
        h = c;
      });
      if ( this._el.nativeElement.scrollTop < h ) {
        this.IonicShellProvider.headerComponentRef.setTranslateY(0);
      }
    });
  }

  ionViewDidLoad() {
    this.num = this.IonicShellProvider.pagesTempCounterID;
    this.IonicShellProvider.pagesTempCounterID++;

    let v = 0;
    this.IonicShellProvider.headerTitleRefHeightSubject.subscribe( height => {
      this._el.nativeElement.style.paddingTop = height + 'px';
      v = height;
    });

    this.IonicShellProvider.tabsButtonsRefHeightSubject.subscribe( height => {
      if ( !this.IonicShellProvider.bottomTabs ) {
        this._el.nativeElement.style.paddingTop = height + v + 'px';
      }else {
        this._el.nativeElement.style.paddingBottom = height + 'px';
      }
    });
  }

  @HostListener('scroll', ['$event.target'])
  onClick(tab) {
      var scrollTop = Math.floor(tab.scrollTop);
      var scroll = scrollTop - this.IonicShellProvider.headerScroll;

      if ( scroll < 0 && ( scroll < -this.IonicShellProvider.distanceToToggleHeader ) ) {
        this.IonicShellProvider.hideHeader.next(false);
        this.IonicShellProvider.headerScroll = scrollTop;
      }else if ( scroll > 0 && ( scroll > this.IonicShellProvider.distanceToToggleHeader ) ) {
        this.IonicShellProvider.hideHeader.next(true);
        this.IonicShellProvider.headerScroll = scrollTop;
      }
  }

}
