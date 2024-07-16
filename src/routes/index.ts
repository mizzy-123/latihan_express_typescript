import { Router } from "express";
import productRouter from "./product.route";
import { errorHandling, notFound } from "../middleware/error.middleware";
import userRouter from "./user.route";
import { authenticate } from "../middleware/authenticate";

const app = Router();

app.use("/api", userRouter);

app.use(authenticate);

app.use("/api", productRouter);

app.use("*", errorHandling);

app.use("*", notFound);

export default app;
