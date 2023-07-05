import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>{{ data.message }}</h2>
  <mat-dialog-content>
    <p>Are you sure you want to proceed?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>{{ data.buttonText.cancel }}</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>{{ data.buttonText.ok }}</button>
  </mat-dialog-actions>
  `,
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
public message: string 

  onCancelClick(): void {
    this.dialogRef.close(false); // close dialog with "false" value
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); // close dialog with "true" value
  }

}
