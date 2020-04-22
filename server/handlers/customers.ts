import * as express from "express";
import stripe from "../stripe";

const customersRouter = express.Router();

customersRouter.get(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const customer = await stripe.customers.retrieve(id);
    res.send(customer);
  }
);

customersRouter.get(
  "/",
  async (req: express.Request, res: express.Response) => {
    const { data } = await stripe.customers.list();
    const customers = data.map(({ id, name, email }) => ({ id, name, email }));
    res.send(customers);
  }
);

export default customersRouter;
