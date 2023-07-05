import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from '../cart.component';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-co-dialog-payment-option',
  templateUrl: './co-dialog-payment-option.component.html',
  styleUrls: ['./co-dialog-payment-option.component.css']
})
export class CoDialogPaymentOptionComponent implements OnInit{

  ngOnInit() {
    // this.TotalPrice = this.route.snapshot.paramMap.get('uid');
    this.invokeStripe();
    // this.Total()
  }

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private payment: PaymentService,
    private toastr: ToastrService,) {
    dialogRef.disableClose = true;
    this.TotalPrice = this.data.total
  }

  publishable_key: any =
    'pk_test_51N80epSJsy5aUzwEJxL05T27TfdLRdkXinj4PK3zvzmFjK36Vm35SaDxALbteHiuOTxrR0Tw33JPBhLvBQKKn9vm00ErRLNZfQ';
    paymentlink: any;
    paymentHandler: any = null;
  TotalPrice: any;
  userId: any;
  Msg: any;
  
  makepayment(amount:any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.publishable_key,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log("sg",stripeToken);
        paymentStripe(stripeToken,amount);

      },
    });

    const paymentStripe = (stripeToken: any, amount:any) => {
      this.payment
        .makepayment(stripeToken,amount)
        .subscribe((paymentConfirm: any) => {
          this.toastr.success(paymentConfirm.message);
          this.paymentlink =
            paymentConfirm.result.next_action.use_stripe_sdk.stripe_js;
        });
        console.log(this.paymentlink);
        
    };

    paymentHandler.open({
      name: 'SpiceItUp',
      description: 'The Next Generation Restaurant',
      amount: this.data.Total * 100, 
      currency: 'inr',
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = '//checkout.stripe.com/v2/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.publishable_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log("sg",stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}