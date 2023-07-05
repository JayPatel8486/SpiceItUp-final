import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/order';
import { TableOrder } from 'src/app/table-order';



@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  orderData: any
  temp: any
  displayedColumns: string[] = ['srNo', 'item_name'];
  dataSource: MatTableDataSource<TableOrder>;
  noOrders: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.Details=data
    this.orderData = data
    console.log("fdsafasdfadsgdsfg", this.orderData)
    this.dataSource = new MatTableDataSource(this.temp);
    if(this.orderData.length===0){
      this.noOrders=true
    }
    else{
    for (let i of this.orderData) {
      this.temp = i.order_items
      console.log(i.order_items)
    }

    for (let i of this.temp) {
      console.log(i.item_name)
    }
  }
  }


  onClose(): void {
    this.dialogRef.close()

  }
}
