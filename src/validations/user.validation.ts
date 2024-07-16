import Joi from "joi";
import type UserType from "../types/user.type";

export const inputUserValidation = (payload: UserType): Joi.ValidationResult<UserType> => {
  const schema = Joi.object({
    id: Joi.string().trim().allow(null, ""),
    email: Joi.string().trim().required().email(),
    nama: Joi.string().trim().required(),
    password: Joi.string().min(3).max(15).required(),
    confirmPassword: Joi.any().equal(Joi.ref("password")).required().label("Confirm Password").messages({
      "any.only": "{{#label}} doesn't match password",
      "any.required": "{{#label}} requiered",
    }),
    role: Joi.string().trim().allow(null, ""),
  });
  return schema.validate(payload, { abortEarly: false });
};

export const loginUserValidation = (payload: UserType): Joi.ValidationResult<UserType> => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().min(3).max(15).required(),
  });
  return schema.validate(payload, { abortEarly: false });
};
