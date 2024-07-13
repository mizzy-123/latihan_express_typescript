import joi from "joi";
import type ProductType from "../types/product.type";

export const inputProductValidation = (payload: ProductType): joi.ValidationResult<ProductType> => {
  const schema = joi.object({
    nama: joi.string().required(),
    jumlah: joi.number().required(),
    harga: joi.number().required(),
  });

  return schema.validate(payload, { abortEarly: false });
};
