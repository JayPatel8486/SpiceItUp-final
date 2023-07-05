import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, async, count, tap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/Model/cart';
import { Router } from '@angular/router';
import { TableOrder } from 'src/app/table-order';
import { ApiService } from 'src/app/services/api.service';
import { CoDialogPaymentOptionComponent } from './co-dialog-payment-option/co-dialog-payment-option.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  isChild = true;
  Payment = "";

  //Importing the TableOrder Interface
  tableOrders: TableOrder[]=[];


  carts: any;
  cartDetails: any;
  public products: any = [];
  public grandTotal: number;
  item: any;
  public counters: any = [];
  pos: any;
  store: number;
  public pushItems: any[] = [];
  product: any;
  subtotal: any;
  temp: any;
  totalprice = 0;
  finalprice: any;
  public bookingId: any;
  public userId: any;
  public cartItemList: any = [];
  getTotalPrice: any;
  cartAdd: Item = {
    booking_id: '',
    user_id: '',
    order_items: [],
    finalTotal: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '',
    updateBy: '',
  };

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      console.log('counter', this.counters);
      console.log('products', this.products);
    });
    for (let index = 0; index < this.products.length; index++) {
      this.counters.push(1);
      this.Total();
      this.Total();
    }
    this.Total();
  }

  // add to data base

  addDB(products: any) {
    for (let index = 0; index < products.length; index++) {
      this.pushItems.push(products[index]);
    }

    this.bookingId = localStorage.getItem('bookingId');

    this.userId = localStorage.getItem('userId');


    this.cartAdd = {
      booking_id: this.bookingId,
      user_id: this.userId,
      order_items: this.pushItems,
      finalTotal: this.totalprice,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user',
      updateBy: 'user',
    };
    for (let index = 0; index < products.length; index++)
      console.log('Counterrrrr', this.counters[index]);


    products.forEach((a: any, index: any) => {
      Object.assign(a, {
        quantity: this.counters[index],
        total: this.counters[index] * this.products[index].price,
        finalTotal: this.totalprice,
      });
     
    });

    console.log('cart item addd', this.cartAdd);

    this.cartService
      .postCartItem({
        ...this.cartAdd,
        booking_id: this.bookingId,
        user_id: this.userId,
      })
      .subscribe((res) => {
        console.log('adddd on DB', res);
      });

      this.toastr.success('Order Successfull', '', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  // remove  one item from cart

  removeItem(item: any) {
    const index = this.products.indexOf(item);
    [...this.products.splice(index, 1)];
  }

  //whole cart empty
  emptyCart() {
    this.cartService.removeAllCart();
    this.toastr.success('cart Emptied', '', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  // increse quantity
  increment(pos: any, item: any) {
    this.counters[pos] = this.counters[pos] + 1;
    console.log('increament', this.counters[pos]);
    this.store = this.counters[pos];

  }

  // decrese quantity
  decrement(pos: any) {
    if (this.counters[pos] == 1) {
      this.counters[pos] = this.counters[pos];
    } else {
      this.counters[pos] = this.counters[pos] - 1;
      console.log('decreament', this.counters[pos]);
    }
  }
  // grand total
  Total() {
    var i = 0;
    if (this.totalprice == 0) {
      for (i = 0; i < this.products.length; i++) {
        this.subtotal = this.counters[i] * this.products[i].price;

        this.temp = this.subtotal;

        this.totalprice = this.totalprice + this.temp;
      }
    } else {
      this.totalprice = 0;

      for (i = 0; i < this.products.length; i++) {
        this.subtotal = this.counters[i] * this.products[i].price;

        this.temp = this.subtotal;

        this.totalprice = this.totalprice + this.temp;
  
      }
    }
  }

  openDialog(): void {
    console.log("sjdfbjkshnvcnsdfnv");
    
    let dialogRef = this.dialog.open(CoDialogPaymentOptionComponent, {
      width: '530px',
      height: '330px',
      data: {
        Total: this.totalprice
      },
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('ress;', result);

      console.log('The dialog was closed');
    });
  }
}
