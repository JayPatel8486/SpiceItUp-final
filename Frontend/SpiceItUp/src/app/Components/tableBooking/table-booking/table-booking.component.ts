import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableBookingService } from 'src/app/services/table-booking.service';
import { DialogTableBookingComponent } from '../dialog-table-booking/dialog-table-booking.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.css']
})
export class TableBookingComponent {
  minDate: Date | undefined;
  maxDate: Date | undefined;

  stateChanges: any;
  parts: any;
  data: number[] | any;
  ts: any = false;
  sethour: any = false;
  userauth: any;
  user: object[] | any;
  userId: any;
  disableTextbox = true;

  constructor(
    public dialog: MatDialog,
    private bookings: TableBookingService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }

  tablebookingform: FormGroup = new FormGroup({});

  ngOnInit() {
    this.tablebookingform = this.fb.group({
      date: ['', [Validators.required]],
      time_slot: ['', [Validators.required]],
      table: ['', [Validators.required]],
      request: ['', []],
    });

    const currentDate = new Date();
    this.minDate = new Date(currentDate);
    this.maxDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
    this.onAdded();
  }

  toggleDisable() {
    this.disableTextbox = false;
  }

  books: any;
  book(booking: any) {
    const body = this.tablebookingform.value;
    body.date = this.datePipe.transform(body.date, 'yyyy-MM-dd');
    console.log('1', body);

    booking.timeStamp = this.ts;
    console.log('timestamp added', booking.timeStamp);

    booking.userId = localStorage.getItem('userId');
    console.log(booking.userId);

    this.bookings.addbooking(booking).subscribe({
      next: (result: any) => {
        console.log('2', result);
        if (result) {
          localStorage.setItem('bookingId', result._id);
          this.toastr.success('Table booked successfully', '', {
            timeOut: 1000,
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

  onAdded() {
    // console.log("date:::::", typeof this.date);
    if (this.date == '') return;

    let timeStamp = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.time_slot,
      0,
      0
    ).getTime();
    console.log('timestamp ' + timeStamp);

    this.ts = timeStamp;

    this.bookings.gettables(timeStamp).subscribe((result: number[]) => {
      this.data = result;
      console.log(this.data);
    });
  }

  setdates() {
    let d = new Date();
    d.setHours(11);
    console.log('hours' + d);
    this.sethour = d;
  }

  times = [
    { value: new Date(this.sethour).getHours() + 6, viewValue: '11am-12pm' },
    { value: new Date(this.sethour).getHours() + 7, viewValue: '12pm-1pm' },
    { value: new Date(this.sethour).getHours() + 8, viewValue: '1pm-2pm' },
    { value: new Date(this.sethour).getHours() + 9, viewValue: '2pm-3pm' },
    { value: new Date(this.sethour).getHours() + 13, viewValue: '6pm-7pm' },
    { value: new Date(this.sethour).getHours() + 14, viewValue: '7pm-8pm' },
    { value: new Date(this.sethour).getHours() + 15, viewValue: '8pm-9pm' },
    { value: new Date(this.sethour).getHours() + 16, viewValue: '9pm-10pm' },
    { value: new Date(this.sethour).getHours() + 17, viewValue: '10pm-11pm' },
  ];

  get date() {
    return this.tablebookingform.get('date')?.value;
  }

  set date(value: any) {
    this.date = value;
  }

  get time_slot() {
    return this.tablebookingform.get('time_slot')?.value;
  }

  set time_slot(value: any) {
    this.time_slot = value;
  }

  get table() {
    return this.tablebookingform.get('table');
  }

  set table(value: any) {
    this.table = value;
  }

  get request() {
    return this.tablebookingform.get('request');
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogTableBookingComponent, {
      width: '530px',
      height: '330px',
      data: {
        date: this.date,
        time_slot: this.time_slot,
        table: this.table.value,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('ress;', result);

      console.log('The dialog was closed');
    });
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;
}
