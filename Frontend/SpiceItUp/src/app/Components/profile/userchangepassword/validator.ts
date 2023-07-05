import { FormGroup, FormControlName, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";

 export const matchpassword :ValidatorFn = (control:AbstractControl):ValidationErrors|null =>{
    let password = control.get('newPassword');
    let confirm_password = control.get('confirm_password');
    if(password && confirm_password && password?.value != confirm_password?.value){
        return{
            passwordmatcherror : true
        }
    }
   return null;
      
}