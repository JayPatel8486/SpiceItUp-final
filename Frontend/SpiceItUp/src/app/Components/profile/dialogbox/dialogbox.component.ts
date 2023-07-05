import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogbox',
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
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {
     
  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); 
  }

}
