import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerprofileService } from 'src/app/services/customerprofile.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit{

  displayedColumns: string[] = ['first_name', 'last_name','email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  customers: any;


  constructor(private customerProfile:CustomerprofileService, private dialog : MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.customerProfile.getCustomerDetails().subscribe({
      next: (res: any) => {
        // console.log(res.table);
        this.customers = res;
        console.log(this.customers);
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },

      error: (err) => {
        this.toastr.error('Error while fetching the data', '', {timeOut: 1000,progressBar: true,progressAnimation: 'increasing'});
      },
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