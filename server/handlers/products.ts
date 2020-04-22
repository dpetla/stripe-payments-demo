import * as express from "express";
import { products } from "../demo-data";

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => res.json(Object.values(products)));

export default productsRouter;
