import { type NextFunction, type Request, type Response } from "express";
import { inputProductValidation } from "../validations/product.validation";
import { deleteProduct, getproduct, getProductById, insertProduct, updateProduct } from "../services/produk.services";

export const getAllProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const data = await getproduct();

    return res.status(200).json({
      error: null,
      message: "Pengambilan semua data berhasil",
      data: data,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/product.controller.ts : getAllProduct - " + String((error as Error).message)));
  }
};

export const getDataProductById = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const { id } = req.params;
    const data = await getProductById(parseInt(id));
    return res.status(200).json({
      error: null,
      message: "Pengambilan data berhasil",
      data: data,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/product.controller.ts : getDataProductById - " + String((error as Error).message)));
  }
};

export const insertDataProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
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

    const product = await insertProduct(value);
    return res.status(200).json({
      error: null,
      message: "Insert Data sukses",
      data: product,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/product.controller.ts : inertDataProduct - " + String((error as Error).message)));
  }
};

export const updateDataProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const { id } = req.params;
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

    const data = await updateProduct({ ...value, id: parseInt(id) });
    return res.status(200).json({
      error: null,
      message: "Update product success",
      data: data,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/product.controller.ts : updateDataProduct - " + String((error as Error).message)));
  }
};

export const deleteDataProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const { id } = req.params;
    const data = await deleteProduct(parseInt(id));
    return res.status(200).json({
      error: null,
      message: "Delete data sukses",
      data,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/product.controller.ts : deleteDataProduct - " + String((error as Error).message)));
  }
};
