import { Router } from "express";
import { deleteDataProduct, getAllProduct, getDataProductById, insertDataProduct, updateDataProduct } from "../controller/product.controller";

const productRouter = Router();

productRouter.get("/product", getAllProduct);

productRouter.get("/product/:id", getDataProductById);

productRouter.post("/product", insertDataProduct);

productRouter.put("/product/:id", updateDataProduct);

productRouter.delete("/product/:id", deleteDataProduct);

export default productRouter;
