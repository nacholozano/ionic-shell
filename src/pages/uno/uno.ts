import { Component, HostListener, HostBinding, ElementRef, ChangeDetectorRef } from '@angular/core';
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

  num;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private IonicShellProvider:IonicShellProvider,
    private _el: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(){
    this.IonicShellProvider.ionicShellTabsComponent.ionSlideWillChange.subscribe(data => {
      if ( data.realIndex !== this.num ){ return; }
      console.log(data);
      let h;
      this.IonicShellProvider.buttonsHeight.subscribe(c => {
        h = c;
      });
      if ( this._el.nativeElement.scrollTop < h ) {
        this.IonicShellProvider.headerref.transform = 'translateY(0)';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnoPage', this.IonicShellProvider.num);
    this.num = this.IonicShellProvider.num;
    this.IonicShellProvider.num++;

    /* this.IonicShellProvider.buttonsBottoms.subscribe( height => {
      this._el.nativeElement.style.paddingTop = height + 'px';
    });

    this.IonicShellProvider.buttonsHeight.subscribe( height => {
      this._el.nativeElement.style.paddingTop = height - 5 + 'px';
    }); */
    let v = 0;
    this.IonicShellProvider.headerTitleRefHeightSubject.subscribe( height => {
      this._el.nativeElement.style.paddingTop = height + 'px';
      v = height;
    });

    this.IonicShellProvider.tabsButtonsRefHeightSubject.subscribe( height => {
      this.IonicShellProvider.bottomTabs.subscribe( bottom => {
        if ( !bottom ) {
          this._el.nativeElement.style.paddingTop = height + v + 'px';
        }else {
          this._el.nativeElement.style.paddingBottom = height + 'px';
        }
      });
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
