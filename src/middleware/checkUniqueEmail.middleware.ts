import { type NextFunction, type Request, type Response } from "express";
import prisma from "../utils/connection";

export const checkUniqueEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return res.status(400).json({
      message: "Email sudah digunakan",
    });
  }
  next();
};
