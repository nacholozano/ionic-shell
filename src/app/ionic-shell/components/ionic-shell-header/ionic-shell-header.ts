import { Component, Input, ViewChild, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';
import { Header } from 'ionic-angular';
import { IonicShellTabsButtonsComponent } from '../ionic-shell-tabs-buttons/ionic-shell-tabs-buttons';

/**
 * Manage header visibility.
 *
 * @export
 * @class IonicShellHeaderComponent
 */
@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonicShellHeaderComponent {

  /**
   * If ionic menu is used.
   *
   * @type {boolean}
   * @memberof IonicShellHeaderComponent
   */
  hasMenu: boolean;

  /**
   * Ionic header nativeElement reference.
   *
   * @memberof IonicShellHeaderComponent
   */
  ionHeaderNative;

  /**
   * Setter of ionHeader Viewchild to get nativeElement.
   *
   * @memberof IonicShellHeaderComponent
   */
  @ViewChild(Header)
  private set ionHeader(header){
    this.ionHeaderNative = header.getNativeElement();
  }
  @ViewChild(IonicShellTabsButtonsComponent) ionicShellTabsButtonsComponent: IonicShellTabsButtonsComponent;

  /**
   * Header title.
   *
   * @private
   * @type {string}
   * @memberof IonicShellHeaderComponent
   */
  @Input() private text: string;

  /**
   * Check if bottomTabs configuration is used.
   *
   * @type {boolean}
   * @memberof IonicShellHeaderComponent
   */
  public bottomButtons: boolean;

  constructor(
    private _ionicShellProvider: IonicShellProvider,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    this.bottomButtons = this._ionicShellProvider.bottomTabs;

    this._ionicShellProvider.hideHeader.subscribe( hide =>{
      if( hide ) {
        this.setTranslateY(-this.ionHeaderNative.clientHeight);
      }else{
        this.setTranslateY(0);
      }
    });

    this._ionicShellProvider.headerComponentRef = this;
  }

  /**
   * Set header Y axis translation.
   *
   * @param {number} transform
   * @memberof IonicShellHeaderComponent
   */
  public setTranslateY(transform: number){
    this._el.nativeElement.style.transform = `translateY(${transform}px)`;
  }

}
