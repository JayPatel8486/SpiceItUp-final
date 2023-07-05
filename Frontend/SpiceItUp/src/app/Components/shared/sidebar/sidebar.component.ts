import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private route: Router, private observer: BreakpointObserver) { }
  onLogOut() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('bookingId');
    localStorage.removeItem('lastAction');
    this.route.navigate(['']);
  }

  ngOnInit() {

    

    this.adminUser();
    this.staffUser();
  }

  adminUser() {
    let user = localStorage.getItem('userRole')
    // console.log(user);

    if (user == "admin") {
      // console.log('only for admin');
      return false;
    }
    return true
  }

  staffUser() {
    let user = localStorage.getItem('userRole')
    // console.log(user);

    if (user == "staff") {
      // console.log('only for admin');
      return false;
    }
    return true
  }

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 600px)"]).subscribe((res: any) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

}
