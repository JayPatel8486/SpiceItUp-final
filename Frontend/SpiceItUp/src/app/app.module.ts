import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegistrationComponent } from './Components/Auth/registration/registration.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './Components/Auth/page-not-found/page-not-found.component';
import { TableBookingComponent } from './Components/tableBooking/table-booking/table-booking.component';
import { DialogTableBookingComponent } from './Components/tableBooking/dialog-table-booking/dialog-table-booking.component';
import { OrderComponent } from './Components/order/order/order.component';
import { HeaderComponent } from './Components/shared/header/header.component';
import { SidebarComponent } from './Components/shared/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home/home.component';
import { MenuItemComponent } from './Components/menu/menu-item/menu-item.component';
import { AddmenuComponent } from './Components/menu/addmenu/AddmenuComponent';
import { MenuAdminComponent } from './Components/menu/menu-admin/menu-admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { OtpComponent } from './Components/Auth/otp/otp.component';
import { ChangePasswordComponent } from './Components/Auth/change-password/change-password.component';
import { CartComponent } from './Components/cart/cart.component';
import { MenuStaffComponent } from './Components/menu-staff/menu-staff.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InterceptInterceptor } from './services/intercept.interceptor';
import { CustomerprofileComponent } from './Components/customerprofile/customerprofile.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { StaffManagementComponent } from './Components/staffManagement/staff-management/staff-management.component';
import { DialogAddStaffComponent } from './Components/staffManagement/dialog-add-staff/dialog-add-staff.component';
import { DialogUpdateStaffComponent } from './Components/staffManagement/dialog-update-staff/dialog-update-staff.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CustomerOrderComponent } from './Components/order/customer-order/customer-order.component';
import { ConfirmationDialogComponent } from './Dialogbox/confirmation-dialog/confirmation-dialog.component';
import { FeedbackDialogComponent } from './Dialogbox/feedback-dialog/feedback-dialog.component';
import { ViewCustomerDialogComponent } from './Dialogbox/view-customer-dialog/view-customer-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserchangepasswordComponent } from './Components/profile/userchangepassword/userchangepassword.component';
import { AboutUsComponent } from './Components/About/about-us/about-us.component';
import { DeleteDialogComponent } from './Dialogbox/delete-dialog/delete-dialog.component';
import { OrderDialogComponent } from './Dialogbox/order-dialog/order-dialog.component';
import { DialogboxComponent } from './Components/profile/dialogbox/dialogbox.component';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { PaymentComponent } from './Components/payment/payment.component';
import { CoDialogPaymentOptionComponent } from './Components/cart/co-dialog-payment-option/co-dialog-payment-option.component';
import { ConnectionStatusComponent } from './Components/connection-status/connection-status.component';
import { MapComponent } from './Components/About/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    TableBookingComponent,
    DialogTableBookingComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    MenuItemComponent,
    PageNotFoundComponent,
    OrderComponent,
    OtpComponent,
    ChangePasswordComponent,
    MenuAdminComponent,
    AddmenuComponent,
    CartComponent,
    MenuStaffComponent,
    CustomerprofileComponent,
    ProfileComponent,
    StaffManagementComponent,
    DialogAddStaffComponent,
    DialogUpdateStaffComponent,
    CustomerOrderComponent,
    ConfirmationDialogComponent,
    FeedbackDialogComponent,
    ViewCustomerDialogComponent,
    UserchangepasswordComponent,
    AboutUsComponent,
    DeleteDialogComponent,
    OrderDialogComponent,
    DialogboxComponent,
    CoDialogPaymentOptionComponent,
    ConnectionStatusComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        autoDismiss: true,
        newestOnTop: true
      }
    ),
    MatBadgeModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    FlexLayoutModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatSidenavModule,
    ScrollingModule,
    MatSidenavModule,
    GoogleMapsModule,

  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
