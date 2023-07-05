import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/menuapi.service';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  imageSource: any;
  public productList: any;
  ngClass: any[] = [];
  searchKey: string = '';
  isCollapsed: any;
  public totalItem: number = 0;
  public counters: any = [];
  isBooked!: boolean;
  pagination: number = 1;
  category: any;
  headerMenu:any
  

  public originCategory: any;
  foodItems: any[];
  filteredFoodItems: any[];
  originCategories: string[];


  public bookingId = localStorage.getItem('bookingId');

  item: any;
  items: any;
  filters: any;
  menudata: any;
  pageNumber = 1;
  pageSize = 6;
  totalPages: any;

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}
  url: any = 'http://localhost:4000/image/';

  ngOnInit(): void {
    this.getProduct();
    // this.filterData();
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
   
    this.getHeaderMenu()
  }


  // get item

  getProduct() {
    this.api.getProduct(this.pageNumber, this.pageSize).subscribe((res) => {
      console.log(res);
      this.foodItems = res;

      this.originCategories = Array.from(
        new Set(this.foodItems.map((foodItem) => foodItem.item_type))
      );
      this.filteredFoodItems = this.foodItems;
      this.item = res;
      this.totalPages = res.length;
    });
  }

  nextPage(): void {
    this.pageNumber++;
    this.getProduct();
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getProduct();
    }
  }

  isCurrentPage() {
    return this.pageNumber;
  }

  // check table booking

  checkBooking() {
    console.log('bookkkk', this.bookingId);

    if (this.bookingId) {
    }
    return true;
  }

  // for add data to database

  addtoCart(items: any) {
    if (this.bookingId) {
      console.log('items ', items._id);
      console.log('cartService: ', this.cartService.cartItemList);
      console.log('cartService: ', this.cartService.cartItemList.length);

      if (
        this.cartService.cartItemList.find(
          (cart: any) => cart._id === items._id
        )
      ) {
        this.toastr.warning(
          'Item has been already added to the cart',
          'Please Check Your Cart',
          { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' }
        );
      } else {
        this.cartService.addtoCart(items);
      }
    }
    // without table book cannot be added to the cart
    else {
      this.toastr.info(
        'You cannot add items to the cart without booking the table',
        'First Book Your Table',
        { timeOut: 3000, progressBar: true, progressAnimation: 'increasing' }
      );
    }
  }

  // filter (all) categories

  AllItemFilter() {
    this.pageNumber=1
    this.getProduct()
  }

  // filter category(expect all)

  onOriginCategorySelected(category: string) {
    this.pageNumber=1

    this.api.filter(category).subscribe((res) => {

      console.log('this.category', category);
      this.foodItems = res
      this.originCategory = res;

      this.originCategory = Array.from(
        new Set(this.foodItems.map((foodItem) => foodItem.item_type))
      );
      this.filteredFoodItems = this.foodItems;
      this.item = res;
    });
  }

  // header category 
  getHeaderMenu(){

    this.api.header().subscribe({
      next:(res)=>{
        this.headerMenu = res;
        let test = new Set(this.headerMenu.item_type)
      
        for(let item of this.headerMenu){
          test.add(item.item_type)
        } 
        this.headerMenu = test
        
       
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
}
