import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home/home.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { TableBookingComponent } from './Components/tableBooking/table-booking/table-booking.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './Components/Auth/page-not-found/page-not-found.component';
import { RegistrationComponent } from './Components/Auth/registration/registration.component';
import { MenuItemComponent } from './Components/menu/menu-item/menu-item.component';
import { MenuAdminComponent } from './Components/menu/menu-admin/menu-admin.component';
import { AuthGuard } from './services/auth.guard';
import { OrderComponent } from './Components/order/order/order.component';
import { OtpComponent } from './Components/Auth/otp/otp.component';
import { CartComponent } from './Components/cart/cart.component';
import { MenuStaffComponent } from './Components/menu-staff/menu-staff.component';
import { ChangePasswordComponent } from './Components/Auth/change-password/change-password.component';
import { CustomerprofileComponent } from './Components/customerprofile/customerprofile.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { StaffManagementComponent } from './Components/staffManagement/staff-management/staff-management.component';
import { CustomerOrderComponent } from './Components/order/customer-order/customer-order.component';
import { UserchangepasswordComponent } from './Components/profile/userchangepassword/userchangepassword.component';
import { AboutUsComponent } from './Components/About/about-us/about-us.component';
// import { PaymentComponent } from './Components/payment/payment.component';

const routes: Routes = [
  // {
  //   path: 'payment',
  //   component: PaymentComponent,
  // },
  {
    path: 'customerProfile',
    component: CustomerprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adminMenu',
    component: MenuAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: CustomerOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staffMenu',
    component: MenuStaffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff',
    component: StaffManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'userprofile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userChangePassword',
    component: UserchangepasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userChangePassword',
    component: UserchangepasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: MenuItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'table_booking',
    component: TableBookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'otp',
    component: OtpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Registration',
    component: RegistrationComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
