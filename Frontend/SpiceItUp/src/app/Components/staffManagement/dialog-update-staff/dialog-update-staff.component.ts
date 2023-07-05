import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StaffManagementService } from 'src/app/services/staff-management.service';
import { DialogAddStaffComponent } from '../dialog-add-staff/dialog-add-staff.component';

@Component({
  selector: 'app-dialog-update-staff',
  templateUrl: './dialog-update-staff.component.html',
  styleUrls: ['./dialog-update-staff.component.css']
})
export class DialogUpdateStaffComponent {
  addStaffForm: any;

  constructor(private fb: FormBuilder, private staff: StaffManagementService,
    @Inject(MAT_DIALOG_DATA) public editStaff: any, private toastr: ToastrService,
    private dialogRef: MatDialogRef<DialogUpdateStaffComponent>) { }

  updateStaffForm: FormGroup = new FormGroup({});

  ngOnInit() {

    this.updateStaffForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    }),
      console.log(this.editStaff);
    if (this.editStaff) {
      this.updateStaffForm.controls['first_name'].setValue(this.editStaff.first_name);
      this.updateStaffForm.controls['last_name'].setValue(this.editStaff.last_name);
      this.updateStaffForm.controls['gender'].setValue(this.editStaff.gender);
      this.updateStaffForm.controls['phone'].setValue(this.editStaff.phone);
      this.updateStaffForm.controls['email'].setValue(this.editStaff.email);
    }
  }

  get f() {
    return this.updateStaffForm.controls;
  }

  updatestaff() {
    this.staff.updateStaff(this.updateStaffForm.value, this.editStaff._id)
      .subscribe({
        next: (res) => {
          this.toastr.success('Update staff details successfull', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' })
          this.updateStaffForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.toastr.error('Staff details not update', '', { timeOut: 1000, progressBar: true, progressAnimation: 'increasing' });
        }
      })
  }
}
