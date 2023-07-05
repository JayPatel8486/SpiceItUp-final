import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  template:`
  <h2 mat-dialog-title>{{ data.message }}</h2>
  <mat-dialog-content>
    <p>Are you sure you want to proceed?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>{{ data.buttonText.cancel }}</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>{{ data.buttonText.ok }}</button>
  </mat-dialog-actions>`,
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
public message: string 

  onCancelClick(): void {
    this.dialogRef.close(false); // close dialog with "false" value
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); // close dialog with "true" value
  }

}


