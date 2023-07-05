import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortHeader, MatSortable } from '@angular/material/sort';
import { TableOrder } from 'src/app/table-order';
import { User } from 'src/app/user';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ViewCustomerDialogComponent } from 'src/app/Dialogbox/view-customer-dialog/view-customer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from 'src/app/Dialogbox/order-dialog/order-dialog.component';
import { Order } from 'src/app/order';
import { interval } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //Importing the TableOrder Interface
  tableOrders: TableOrder[] = [];
  User: User[] = [];
  orders: Order[] =[];

  displayedColumns: string[] = ['srNo', 'date_of_reservation', 'time_slot', 'table_no', 'special_request', 'status', 'change_status'];
  dataSource: MatTableDataSource<TableOrder>;

  // Import the MatSort component and ViewChild decorator
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatSortHeader) sortHeader: any = MatSortHeader;
  
  constructor(private ApiService: ApiService, private toastr: ToastrService, public dialog: MatDialog) {
    // Initialize the MatTableDataSource with an empty array
    this.dataSource = new MatTableDataSource<TableOrder>([]);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    interval().subscribe(() => {
      const currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      this.tableOrders.forEach((tableOrders) => {
        const OrderDate=new  Date(tableOrders.date);
        OrderDate.setHours(0,0,0,0);
        // Check if the order's status is not already 'Completed' and if it's a previous date
        if (tableOrders.status !== 'Completed' && OrderDate<currentDate) {
          this.updateOrderStatus(tableOrders);
        }
      });
    });
    this.getAllTableOrders();
  }

  //This is for getting all Table_order
  getAllTableOrders() {
    this.ApiService.getAllTableOrders().subscribe(tableOrders => {
      this.tableOrders = tableOrders.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate.getTime() < bDate.getTime()) {
          return 1;
        }
        if (aDate.getTime() > bDate.getTime()) {
          return -1;
        }
        return 0;
      });
      this.dataSource = new MatTableDataSource(this.tableOrders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //This is for Updating the Status for Table_order automatically
  updateOrderStatus(tableOrders: { _id: String }): void {
    this.ApiService.UpdateTableStatus(tableOrders._id).subscribe(
      (updatedOrder) => {
        console.log(`Table order with ID ${updatedOrder._id} updated successfully`);
        const index = this.tableOrders.findIndex(order => order._id === updatedOrder._id);
        this.tableOrders[index].status = updatedOrder.status;
        this.toastr.success('Updated Successfully', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this.dataSource = new MatTableDataSource(this.tableOrders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(`Error while updating table order with ID ${tableOrders._id}`,error);
        this.toastr.error('Error while Updating', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    );
    this.getAllTableOrders();
  }


  //This is for getting Order Details of the table
  getOrders(id: any): void {
    let order = this.tableOrders
    console.log("orderrs",order);
    console.log("id",id);
    console.log("booking Id From Component File",order);
    this.ApiService.GetOrder(this.tableOrders,id).subscribe((orders) => {
      this.orders=orders
      console.log('Order Details:', orders);
        const dialogRef = this.dialog.open(OrderDialogComponent, {
          width: '400px',
          data: orders
        });
      },
      error => console.log(error)
    );
  }


  //This is for view Details of Customer
  onCustomerDeatils(customer: any): void {
    const dialogRef = this.dialog.open(ViewCustomerDialogComponent, {
      width: '400px',
      data: { userId: customer }
    });
  }
  
}
