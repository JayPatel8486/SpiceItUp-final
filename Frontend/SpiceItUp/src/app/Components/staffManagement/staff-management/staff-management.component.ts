import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StaffManagementService } from 'src/app/services/staff-management.service';
import { DialogAddStaffComponent } from '../dialog-add-staff/dialog-add-staff.component';
import { DialogUpdateStaffComponent } from '../dialog-update-staff/dialog-update-staff.component';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})

export class StaffManagementComponent implements OnInit {
  
  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  staffs: any;
  id: any;
  
  constructor(public dialog: MatDialog, private staff: StaffManagementService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getstaff();
  }

  getstaff() {
    this.staff.getstaff().subscribe((result: any) => {
      this.staffs = result;
      console.log(this.staffs);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteStaff(id: any) {
    console.log(id);
    this.staff.deleteStaff(id).subscribe({
      next: (result: any) => {
        this.toastr.success('Add new staff successfull', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' })
        this.getstaff();
      },
      error: () => {
        this.toastr.error('Error while delete staff', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' });
      }
    })

  }

  editStaff(staff: any) {
    this.dialog.open(DialogUpdateStaffComponent, {
      width: '35%',
      height: '65%',

      data: staff
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getstaff();
      }
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddStaffComponent, {
      width: '35%',
      height: '65%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'save') {
        this.getstaff();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
