import * as express from "express";
import stripe from "../stripe";

const paymentMethodsRouter = express.Router();

paymentMethodsRouter.get(
  "/list/:customerId",
  async (req: express.Request, res: express.Response) => {
    const { customerId } = req.params;
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });
    res.send(paymentMethods);
  }
);

export default paymentMethodsRouter;
