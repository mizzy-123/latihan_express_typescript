import { type Request, type Response, Router } from "express";
import { inputProductValidation } from "../validations/product.validation";

const productRouter = Router();

productRouter.get("/product", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

productRouter.post("/product", (req: Request, res: Response) => {
  const { error, value } = inputProductValidation(req.body);
  if (error != null) {
    const errorMessages = error.details.map((detail) => ({
      field: detail.context?.key,
      message: detail.message,
    }));
    return res.status(400).json({
      error: errorMessages,
      message: "Input data failed",
      data: value,
    });
  }

  return res.status(200).json({
    error: null,
    message: "Input data sukses",
    data: value,
  });
});

export default productRouter;
