import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddmenuService } from 'src/app/services/addmenu.service';
import { AddmenuComponent } from '../menu/addmenu/AddmenuComponent';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-menu-staff',
  templateUrl: './menu-staff.component.html',
  styleUrls: ['./menu-staff.component.css']
})
export class MenuStaffComponent implements OnInit {


  items!: any;
  menuForm: any;
  item_name: any;
  imageSource: any;
  pageNumber = 1;
  pageSize = 6;
  totalPages: any;

  displayedColumns: string[] = ['item_type', 'item_name', 'price', 'description', 'image_url'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  url: any = "/image/";

  constructor(private api: AddmenuService, private dialog: MatDialog, private http: HttpClient) { }
  ngOnInit(): void {

    this.getProduct();
  }


  getProduct() {
    this.api.getProduct(this.pageNumber, this.pageSize).subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.totalPages = res.length;
        console.log(res)
        this.imageSource = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      


      error: (err) => {
        alert('Error while fetching the data');
      },
    });
  }

  nextPage(): void {
    this.pageNumber++;
    this.getProduct();
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getProduct();
    }
  }

  isCurrentPage() {
    return this.pageNumber;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}




