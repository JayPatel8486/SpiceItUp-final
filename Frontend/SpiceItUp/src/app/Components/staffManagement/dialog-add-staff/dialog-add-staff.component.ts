import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffManagementService } from 'src/app/services/staff-management.service';
import { ConfirmedValidator } from '../../Auth/registration/confirmed.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-add-staff',
  templateUrl: './dialog-add-staff.component.html',
  styleUrls: ['./dialog-add-staff.component.css']
})
export class DialogAddStaffComponent {
  hide = true;
  hides = true

  constructor(private fb: FormBuilder, private staff: StaffManagementService,
    @Inject(MAT_DIALOG_DATA) public editStaff: any, private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogAddStaffComponent>) { }

  addStaffForm: FormGroup = new FormGroup({});

  ngOnInit() {

    this.addStaffForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required,Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,Validators.minLength(4)]],
      confirm_password: ['', [Validators.required]]
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      });
  }

  get f() {
    return this.addStaffForm.controls;
  }

  addstaff() {
    console.log(this.addStaffForm.value);

    if (this.addStaffForm.valid) {
      this.staff.addstaff(this.addStaffForm.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Add new staff successfull', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' })
            this.addStaffForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            this.toastr.error('Error while adding new staff', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' });
          }
        })
    }
  }

}
