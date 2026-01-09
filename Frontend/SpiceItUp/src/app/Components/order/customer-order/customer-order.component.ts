import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TableOrder } from 'src/app/table-order';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../Dialogbox/confirmation-dialog/confirmation-dialog.component';
import { FeedbackDialogComponent } from '../../../Dialogbox/feedback-dialog/feedback-dialog.component';
import { OrderDialogComponent } from 'src/app/Dialogbox/order-dialog/order-dialog.component';
import { Order } from 'src/app/order';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-customer-order',
  template: ` <button
    *ngIf="tableOrder?.status === 'Completed'"
    (click)="openFeedbackDialog()"
  >
    Feedback
  </button>`,
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css'],
})
export class CustomerOrderComponent implements OnInit {
  //Importing the TableOrder Interface
  tableOrders: TableOrder[] = [];
  orders: Order[] = [];
  bill_order: any;

  displayedColumns: string[] = [
    'srNo',
    'date_of_reservation',
    'time_slot',
    'table_no',
    'special_request',
    'status',
    'change_status',
  ];
  dataSource: MatTableDataSource<TableOrder>;

  // Import the MatSort component and ViewChild decorator
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatSortHeader) sortHeader: any = MatSortHeader;
  id: any;
  booking_id: String;

  constructor(
    private ApiService: ApiService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    // Initialize the MatTableDataSource with an empty array
    this.dataSource = new MatTableDataSource<TableOrder>([]);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //this.getAllTableOrders();
    this.getUserData();
  }

  //This is For getting All Order for User
  getUserData() {
    const uid = localStorage.getItem('userId');
    console.log(uid);

    this.ApiService.getLoginUserData(uid).subscribe((tableOrders: any) => {
      this.tableOrders = tableOrders.sort(
        (a: { date: Date }, b: { date: Date }) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          if (aDate.getTime() < bDate.getTime()) {
            return 1;
          }
          if (aDate.getTime() > bDate.getTime()) {
            return -1;
          }
          return 0;
        }
      );
      this.dataSource = new MatTableDataSource(tableOrders);
      // console.log(this.dataSource);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getOrders(id: any): void {
    let order = this.tableOrders;
    console.log('orderrs', order);
    console.log('id', id);
    this.ApiService.GetOrder(this.tableOrders, id).subscribe(
      (orders) => {
        this.orders = orders;
        console.log('Order Details:', this.orders);
        const dialogRef = this.dialog.open(OrderDialogComponent, {
          width: '400px',
          data: orders,
        });
      },
      (error) => console.log(error)
    );
  }

  //This is for Updating the Status for Table_order
  CancelTable(tableOrders: { _id: String }): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this table?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ApiService.CancelTableOrder(tableOrders._id).subscribe(
          (tableOrders) => {
            console.log(
              `Table order with ID ${tableOrders._id} updated successfully`
            );
            const index = this.tableOrders.findIndex(
              (order) => order._id === tableOrders._id
            );
            this.tableOrders[index].status = tableOrders.status;
            this.dataSource = new MatTableDataSource(this.tableOrders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          (error) => {
            console.log(
              `Error while updating table order with ID ${tableOrders._id}`
            );
          }
        );
      }
    });
    this.getUserData();
  }

  //This is for Posting Feedback
  onGiveFeedbackClick(tableOrder: TableOrder): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: { feedback: tableOrder.feedback },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedTableOrder: TableOrder = {
          ...tableOrder,
          feedback: result,
        };
        this.ApiService.Feedback(tableOrder._id, result).subscribe((_) => {
          const index = this.tableOrders.findIndex(
            (t) => t._id === tableOrder._id
          );
          this.tableOrders[index] = updatedTableOrder;
          this.toastr.success('Feedback Stored Succesfully', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' });
        });
      }
    });
  }

  Billing(id: any, action = 'open', data: any) {
    let order = this.tableOrders;
    console.log('orderrs', order);
    console.log('id', id);

    this.ApiService.GetOrder(this.tableOrders, id).subscribe({
      next: (orders) => {
        this.orders = orders;
        console.log('Order Details:', this.orders);


        try {
          console.log('customername', data.userId.first_name);
          console.log('Menu orders', this.orders);

          data.date = this.datePipe.transform(data.date, 'yyyy-MM-dd');

          console.log('11', data);
          let docDefinition = {
            content: [
              {
                text: 'SpiceItUp',
                fontSize: 25,
                alignment: 'center',
                color: 'black',
                margin: [0, 0, 0, 15],
              },
              {
                text: 'INVOICE',
                fontSize: 20,
                bold: true,
                alignment: 'center',
                decoration: 'underline',
                color: 'black',
              },
              {
                text: 'Customer Details',
                style: 'sectionHeader',
              },
              {
                columns: [
                  [
                    {
                      text: 'Name : ' + data.userId.first_name,
                      bold: true,
                    },
                    { text: 'Email : ' + data.userId.email },
                    { text: 'Phone : ' + data.userId.phone },
                  ],
                  [
                    {
                      text: `Date: ${new Date().toLocaleString()}`,
                      alignment: 'right',
                    },
                    {
                      text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
                      alignment: 'right',
                    },
                  ],
                ],
              },
              {
                text: 'Order Details',
                style: 'sectionHeader',
              },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 'auto', 'auto'],
                  body: [
                    ['Menu_items', 'Quantity', 'Price', 'Amount'],
                    ...this.orders[0].order_items.map((p) => [
                      p.item_name,
                      p.quantity,
                      p.price,
                      (p.price * p.quantity).toFixed(2),
                    ]),
                    [
                      { text: 'Total Amount', colSpan: 3 },
                      {},
                      {},
                      this.orders[0].order_items
                        .reduce((sum, p) => sum + p.quantity * p.price, 0)
                        .toFixed(2),
                    ],
                  ],
                },
              },
              {
                text: 'Table Booking Details',
                style: 'sectionHeader',
              },
              {
                text: 'Date : ' + data.date,
                margin: [0, 0, 0, 10],
              },
              {
                text: 'Time : ' + data.time_slot,
                margin: [0, 0, 0, 10],
              },
              {
                text: 'Table : ' + data.table,
                margin: [0, 0, 0, 10],
              },
              {
                columns: [
                  [{ qr: `https://paytm.com/`, fit: '50' }],
                  [{ text: 'Signature', alignment: 'right', italics: true }],
                ],
                margin: [0, 0, 0, 10],
              },
              // {
              //   text: 'Terms and Conditions',
              //   style: 'sectionHeader',
              // },
              {
                text: ['*This is system generated invoice.'],
              },
            ],
            styles: {
              sectionHeader: {
                bold: true,
                decoration: 'underline',
                fontSize: 14,
                margin: [0, 15, 0, 15],
              },
            },
          };

          if (action === 'download') {
            pdfMake.createPdf(docDefinition).download();
          }
        } catch (error: any) {
          console.log(error);
          this.toastr.info('You only booked table, so can not generate invoice!', '', {
            timeOut: 2500,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }

      },
      error: () => {
        this.toastr.error('Something went wrong!', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
    });
  }

  // async generatePDF(action = 'open', data: any) {

  // }
}
