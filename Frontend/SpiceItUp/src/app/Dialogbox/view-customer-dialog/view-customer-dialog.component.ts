import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableOrder } from 'src/app/table-order';

@Component({
  selector: 'app-view-customer-dialog',
  templateUrl: './view-customer-dialog.component.html',
  styleUrls: ['./view-customer-dialog.component.css']
})
export class ViewCustomerDialogComponent {

  customersdetails:any
  constructor( public dialogRef: MatDialogRef<ViewCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:TableOrder) {
      console.log(data);
      this.customersdetails = data
      
    }


    onCloseClick(): void {
      this.dialogRef.close();
    }
}
