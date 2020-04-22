import * as express from "express";
import Stripe from "stripe";
import stripe from "../stripe";

const webhookRouter = express.Router();

webhookRouter.post("/", (req: express.Request, res: express.Response): void => {
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!", paymentIntent);
      break;
    case "payment_intent.payment_failed":
      const paymentFailed = event.data.object;
      console.log("PaymentMethod was attached to a Customer!", paymentFailed);
      break;
    default:
      return res.status(400).end();
  }

  res.json({ received: true });
});

export default webhookRouter;
