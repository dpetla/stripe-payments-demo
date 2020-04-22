import * as express from "express";
import * as serverless from "serverless-http";
import customersRouter from "./handlers/customers";
import paymentIntentRouter from "./handlers/paymentIntent";
import paymentMethodsRouter from "./handlers/paymentMethods";
import productsRouter from "./handlers/products";
import webhookRouter from "./handlers/webhook";

const app = express();
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get("/health", (req, res) => res.status(200).send("ok"));
app.get("/public-key", (req, res) =>
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY })
);
app.use("/webhook", webhookRouter);
app.use("/paymentIntent", paymentIntentRouter);
app.use("/customers", customersRouter);
app.use("/paymentMethods", paymentMethodsRouter);
app.use("/products", productsRouter);

export const handler = serverless(app);
