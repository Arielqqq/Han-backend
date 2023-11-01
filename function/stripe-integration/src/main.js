const stripe = require("stripe")('sk_test_51O4hxbGdMUVbjnpKnGTGyDEn2z1G1Ft8KpzR4KooQ6FxO7W5XFZJWnsY4ejtpPw9OpJzdWtTkxm2rUcRqDEU41Ml00AWDzN5G0');

import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  const { items, amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "aud",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  };
