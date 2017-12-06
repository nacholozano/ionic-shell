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

  /*@HostBinding('style.paddingTop')
  private _paddingTop: string;

  @HostBinding('style.paddingBottom')
  private _paddingBottom: string;*/

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
      // this.IonicShellProvider.headerScroll = this._el.nativeElement.scrollTop;
      if ( data.realIndex !== this.num ){ return; }
      console.log(data);
      let h;
      this.IonicShellProvider.buttonsHeight.subscribe(c => {
        h = c;
      });
      if ( this._el.nativeElement.scrollTop < h ) {
        // dom.tabsHeaderContainer.style.transform = 'translateY(0px)';
        this.IonicShellProvider.headerref.transform = 'translateY(0)';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnoPage', this.IonicShellProvider.num);
    this.num = this.IonicShellProvider.num;
    this.IonicShellProvider.num++;

    this.IonicShellProvider.buttonsBottoms.subscribe( height => {
      // this._paddingBottom = height + 'px';
      this._el.nativeElement.style.paddingTop = height + 'px';
    });

    this.IonicShellProvider.buttonsHeight.subscribe( height => {
      // this._paddingTop = height - 5 + 'px';
      // 15
      this._el.nativeElement.style.paddingTop = height - 5 + 'px';
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
