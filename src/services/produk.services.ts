import { Produk } from "@prisma/client";
import ProductType from "../types/product.type";
import prisma from "../utils/connection";

export const getproduct = async (): Promise<Produk[]> => {
  const data = await prisma.produk.findMany();
  return data;
};

export const getProductById = async (id: number): Promise<Produk | null> => {
  const data = await prisma.produk.findUnique({ where: { id } });
  return data;
};

export const insertProduct = async (payload: ProductType): Promise<Produk | null> => {
  const data = await prisma.produk.create({ data: payload });
  return data;
};

export const updateProduct = async (payload: ProductType): Promise<Produk> => {
  const data = await prisma.produk.update({ where: { id: payload.id }, data: payload });
  return data;
};

export const deleteProduct = async (id: number): Promise<Produk> => {
  const data = await prisma.produk.delete({ where: { id } });
  return data;
};
