import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit{

  feedback: any;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(this.feedback);
  }
}
