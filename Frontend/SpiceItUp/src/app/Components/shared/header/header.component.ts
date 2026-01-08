import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showProfileMenu = false;

  constructor(private router: Router) {}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onLogOut() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('bookingId');
    localStorage.removeItem('lastAction');
    this.router.navigate(['']);
  }
}
