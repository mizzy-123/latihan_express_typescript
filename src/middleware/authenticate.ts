import { NextFunction, Request, Response } from "express";
import { verifyAcessToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (token === undefined) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Unauthorized",
      data: null,
    });
  }

  const user = verifyAcessToken(String(token));
  if (user === null) {
    return res.status(401).json({
      error: "Token tidak valid",
      message: "Verifikasi token gagal",
      data: null,
    });
  }

  next();
};
