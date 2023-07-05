import { Component, OnInit, Inject } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AddmenuService } from 'src/app/services/addmenu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css'],
})
export class AddmenuComponent implements OnInit {
  selectFiles(event: any) {
    this.menuForm.value.image = event.target.files[0]; //image
    console.log('this is the image', this.menuForm.value.image); //image
  }

  menuForm!: FormGroup;
  actionBtn: string = 'Save';
  head: string ='Add Menu'
  
  constructor(
    private formBuilder: FormBuilder,
    private api: AddmenuService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddmenuComponent>,
    private toastr: ToastrService
   
  ) {}

  ngOnInit(): void {
    this.menuForm = this.formBuilder.group({
      item_name: new FormControl('', Validators.required),
      item_type: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  
    if (this.editData) {
      this.actionBtn = 'Update';
      this.head ='Update Menu'
      this.menuForm.controls['item_name'].setValue(this.editData.item_name);
      this.menuForm.controls['item_type'].setValue(this.editData.item_type);
      this.menuForm.controls['price'].setValue(this.editData.price);
      this.menuForm.controls['description'].setValue(this.editData.description);
      this.menuForm.controls['image'].setValue(this.editData.image); 
      
      console.log("  console.log(this.editData);",this.editData);
      //image
    }
  }

  postProduct(check: any) {
    console.log(this.menuForm.value);
    if (!this.editData) {
      if (this.menuForm.valid) {
        let fd = new FormData();
        fd.append('item_name', this.menuForm.value.item_name);
        fd.append('item_type', this.menuForm.value.item_type);
        fd.append('price', this.menuForm.value.price);
        fd.append('description', this.menuForm.value.description);
        fd.append('image', this.menuForm.value.image); //image
        console.log('this is the fd', fd);

        this.api.postProduct(fd).subscribe({
          next: (res) => {
            this.menuForm.reset();
            this.dialogRef.close('save');
            this.toastr.success("Menu added successfully","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});
          },
          error: (e) => {
            console.log(e);
            this.toastr.error("error while adding the menu","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});

          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    if (this.editData){
    if (this.menuForm.valid) {
      let fd = new FormData();
      fd.append('item_name', this.menuForm.value.item_name);
      fd.append('item_type', this.menuForm.value.item_type);
      fd.append('price', this.menuForm.value.price);
      fd.append('description', this.menuForm.value.description);
      fd.append('image', this.menuForm.value.image); //image
      console.log('this is the fd for update', fd); 

    this.api.putProduct(fd, this.editData._id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.menuForm.reset();
        this.dialogRef.close('update');
        this.toastr.success("Update successfully","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});
      },
      error: (e) => {
        console.log(e);
        this.toastr.error("not update successfully","",{timeOut:1500 , progressBar:true , progressAnimation:'increasing'});
      },
    });
  }
}
}
}

