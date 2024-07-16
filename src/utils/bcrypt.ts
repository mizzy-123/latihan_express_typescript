import bcrypt from "bcrypt";

const saltBounds: number = 10;

export const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, saltBounds);
};

export const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
