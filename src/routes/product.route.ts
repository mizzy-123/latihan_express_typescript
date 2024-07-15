import { Router } from "express";
import { deleteDataProduct, getAllProduct, getDataProductById, insertDataProduct, updateDataProduct } from "../controller/product.controller";
import expressAsyncHandler from "express-async-handler";

const productRouter = Router();

productRouter.get("/product", expressAsyncHandler(getAllProduct));

productRouter.get("/product/:id", expressAsyncHandler(getDataProductById));

productRouter.post("/product", expressAsyncHandler(insertDataProduct));

productRouter.put("/product/:id", expressAsyncHandler(updateDataProduct));

productRouter.delete("/product/:id", expressAsyncHandler(deleteDataProduct));

export default productRouter;
