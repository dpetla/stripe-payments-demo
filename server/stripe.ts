import * as dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2020-03-02",
});

export default stripe;
