import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showProfileMenu = false;
  totalCartItems: number = 0;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalCartItems = res.length;
    });
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onLogOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
