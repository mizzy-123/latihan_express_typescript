import { User } from "@prisma/client";
import UserType from "../types/user.type";
import prisma from "../utils/connection";

export const createUser = async (payload: UserType): Promise<User> => {
  const data = await prisma.user.create({
    data: payload,
  });

  return data;
};

export const userLogin = async (payload: UserType): Promise<User | null> => {
  const data = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  return data;
};
