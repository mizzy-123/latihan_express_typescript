import { type NextFunction, type Request, type Response } from "express";
import { inputUserValidation, loginUserValidation } from "../validations/user.validation";
import { createUser, userLogin } from "../services/user.services";
import { compare, encrypt } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const { error, value } = inputUserValidation(req.body);
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

    value.password = encrypt(value.password);
    delete value.confirmPassword;
    const user = await createUser(value);
    return res.status(200).json({
      error: null,
      message: "Register success",
      data: user,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/user.controller.ts : registerUser - " + String((error as Error).message)));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | unknown> => {
  try {
    const { error, value } = loginUserValidation(req.body);
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

    const user = await userLogin(value);
    if (user == null) {
      return res.status(404).json({
        error: "User not found",
        message: "Login gagal",
        data: null,
      });
    }

    if (!compare(value.password, user.password)) {
      return res.status(200).json({
        error: "Wrong password",
        message: "wrong password",
        data: null,
      });
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res.status(200).json({
      error: "Login success",
      message: "Login success",
      data: user,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error: Error | unknown) {
    next(new Error("Error pada file src/controllers/user.controller.ts : loginUser - " + String((error as Error).message)));
  }
};
