const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

exports.paymentProcess = async (req, res, next) => {
    console.log("tttttt",req.body);
  customer = stripe.customers
    .create({
      email: req.body.email,
      source: req.body.id,
      description: req.body.email,
    })



    .then(async (customer) => {
      let paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          exp_month: "05",
          exp_year: "2025",
          number: "4242424242424242",
        },
      });

      paymentIntent = await stripe.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: req.body.price * 100,
        currency: "inr",
        customer: customer.id,
        description: "test Payment",
        confirm: true,
        payment_method_types: ["card"],
      });

      try {
        const paymentConfirm = await stripe.paymentIntents.confirm(
          paymentIntent.id,
          { payment_method: "pm_card_visa" }
        );

        res.status(200).send({
          message: "Payment Successfull...",
          result: paymentConfirm,
        });
      } catch (err) {
        return res
          .status(500)
          .send({ err: err, message: "Payment Failed" });
      }
    });
};

