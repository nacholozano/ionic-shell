import { Component, Input, ViewChild } from '@angular/core';
import { IonicShellProvider } from '../../providers/ionic-shell';

@Component({
  selector: 'ionic-shell-header',
  templateUrl: 'ionic-shell-header.html'
})
export class IonicShellHeaderComponent {

  @ViewChild('ionHeader') ionHeader;
  @ViewChild('headerContainer') headerContainer;

  @Input() private text: string;
  public bottomButtons: boolean;

  transform;

  constructor(
    private _ionicShellProvider: IonicShellProvider
  ) {
  }

  ngOnInit() {
    this._ionicShellProvider.bottomTabs.subscribe( bottom => {
      this.bottomButtons = bottom;
    });

    this._ionicShellProvider.hideHeader.subscribe( hide =>{
      if( hide ) {
        // this._ionicShellProvider.
        this._ionicShellProvider.medioHeader.subscribe( height => {
          this.transform = 'translateY(-' + height + 'px)';
        });
      }else{
        this.transform = 'translateY(0)';
      }
    });

    this._ionicShellProvider.headerref = this;
  }

  ngAfterViewInit() {
    this._ionicShellProvider.medioHeader.next( this.ionHeader.nativeElement.clientHeight );
    this._ionicShellProvider._headerRef = this.headerContainer.nativeElement;
  }

  ngDoCheck(){
    /*if( !this._ionicShellProvider.alturaHeader && this.headerContainer.nativeElement.clientHeight && this._ionicShellProvider.buttonsHeight ){
      this._ionicShellProvider.alturaHeader = true;
      this._ionicShellProvider.buttonsHeight.next( this.headerContainer.nativeElement.clientHeight );
    }*/
  }

}
