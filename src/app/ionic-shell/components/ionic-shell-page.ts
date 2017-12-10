import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef, Injector } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IonicShellProvider } from '../providers/ionic-shell';
import { Observable } from 'rxjs/Observable';

// @IonicPage()
@Component({
  selector: 'ionic-shell-page',
  template: '',
})
export class IonicShellPage {

  private _num;
  public navCtrl: NavController;
  public navParams: NavParams;
  protected IonicShellProvider:IonicShellProvider;
  protected _el: ElementRef;
  private _scrollObservable;

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
      if ( data.realIndex !== this._num ){ return; }
      let h;
      this.IonicShellProvider.tabsButtonsRefHeightSubject.subscribe(c => {
        h = c;
      });
      if ( this._el.nativeElement.scrollTop < h ) {
        this.IonicShellProvider.headerComponentRef.setTranslateY(0);
      }
      this.IonicShellProvider.headerScroll = Math.floor(this._el.nativeElement.scrollTop);
    });

    Observable
      .fromEvent(this._el.nativeElement, 'scroll')
      .debounceTime(50)
      .subscribe( () => {
        this.onScroll();
      });
  }

  ionViewDidLoad() {
    this._num = this.IonicShellProvider.pagesTempCounterID;
    this.IonicShellProvider.pagesTempCounterID++;

    let v = 0;
    this.IonicShellProvider.headerTitleRefHeightSubject.subscribe( height => {
      this._el.nativeElement.style.paddingTop = `${height}px`;
      v = height;
    });

    this.IonicShellProvider.tabsButtonsRefHeightSubject.subscribe( height => {
      if ( !this.IonicShellProvider.bottomTabs ) {
        this._el.nativeElement.style.paddingTop = `${height+v}px`;
      }else {
        this._el.nativeElement.style.paddingBottom = `${height}px`;
      }
    });
  }

  onScroll() {
    console.log(0);
    var scrollTop = Math.floor(this._el.nativeElement.scrollTop);
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
