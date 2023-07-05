import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddmenuService } from 'src/app/services/addmenu.service';
import { AddmenuComponent } from '../addmenu/AddmenuComponent';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/Dialogbox/confirmation-dialog/confirmation-dialog.component';
import { DeleteDialogComponent } from 'src/app/Dialogbox/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent implements OnInit {
  items!: any;
  menuForm: any;
  item_name: any;
  pageNumber = 1;
  pageSize = 6;
  totalPages: any;

  displayedColumns: string[] = [
    'item_type',
    'item_name',
    'price',
    'description',
    'image_url',
    'action',
  ];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter', { static: false }) filter: ElementRef;

  constructor(
    private toastr: ToastrService,
    private api: AddmenuService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  url: any = 'http://localhost:4000/image/';

  ngOnInit(): void {
    this.getProduct();
    // this.filterTable();
  }

  openDialog() {
    this.dialog
      .open(AddmenuComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getProduct();
        }
      });
  }
  getProduct() {
    this.api.getProduct(this.pageNumber, this.pageSize).subscribe({
      next: (res: any[]) => {
        console.log(res);

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      error: (err) => {
        this.toastr.error('Error while fetching the data', '', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
        });
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


  editProduct(item: any) {
    this.dialog
      .open(AddmenuComponent, {
        width: '30%',

        data: item,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getProduct();
        }
      });
  }

  deleteProduct(id: string) {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure you want to delete item?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.api.deleteProduct(id).subscribe({
          next: (res) => {
            this.toastr.success('Menu Item Delete Successfully', '', {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
            });

            this.getProduct();
          },
          error: () => {
            this.toastr.error('Error while deleting the Menu Item !!!', '', {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
            });
          },
        });
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
