import { Component, OnInit, Input, DoCheck, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.css'],
})
export class ConnectionStatusComponent implements OnInit,OnChanges,DoCheck {
  @Input() onlineStatusMessage: string;
  @Input() onlineStatus: string;
  constructor(private toastr: ToastrService) {}
  ngOnInit() {}

  ngOnChanges() {
    // console.log("osnw",this.onlineStatus);
    if (this.onlineStatus == 'online') {
      setTimeout(() => {
        this.toastr.success(this.onlineStatus, '', {
          timeOut:5000,
          tapToDismiss: true,
        });
      }, 1000);
      console.log('you are', this.onlineStatus);
    }
    }

    ngDoCheck(){
      if (this.onlineStatus == 'offline') {
      
        console.log('you are', this.onlineStatus);
      
          this.toastr.error(this.onlineStatus, '', {
            timeOut:2000,
          });
        }
    }
    
  }

