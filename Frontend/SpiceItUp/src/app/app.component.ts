import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public onlineEvent: Observable<Event>;
  public offlineEvent: Observable<Event>;
  public subscriptions: Subscription[] = [];
  public connectionStatusMessage: string;
  public connectionStatus: string;

  constructor(private ngxService: NgxUiLoaderService) {}

  title = 'SpiceItUp';

  ngOnInit() {
    this.ngxService.startBackground('do-background-things');

    this.ngxService.stopBackground('do-background-things');

    this.ngxService.startLoader('loader-01');

    setTimeout(() => {
      this.ngxService.stopLoader('loader-01');
    }, 1000);

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe((event) => {
        this.connectionStatusMessage = 'Connected to internet! You are online';
        this.connectionStatus = 'online';
        console.log("online...");
        
      })
    );
    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.connectionStatusMessage = 'Connection lost! You are offline';
        this.connectionStatus = 'offline';
        console.log("offline...");
        
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
}
}
