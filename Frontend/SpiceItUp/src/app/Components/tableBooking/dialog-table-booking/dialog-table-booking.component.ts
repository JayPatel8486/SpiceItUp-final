import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-table-booking',
  templateUrl: './dialog-table-booking.component.html',
  styleUrls: ['./dialog-table-booking.component.css']
})
export class DialogTableBookingComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTableBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
