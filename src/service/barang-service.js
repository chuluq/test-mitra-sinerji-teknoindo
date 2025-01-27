import {
  createBarangValidation,
  getBarangValidation,
} from "../validation/barang-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const barang = validate(createBarangValidation, request);

  const totalBarangInDatabase = await prismaClient.barang.count({
    where: {
      kode: barang.kode,
    },
  });

  if (totalBarangInDatabase === 1) {
    throw new ResponseError(400, "kode already exists");
  }

  return prismaClient.barang.create({
    data: barang,
    select: {
      id: true,
      kode: true,
      nama: true,
      harga: true,
    },
  });
};

const get = async (barangId) => {
  barangId = validate(getBarangValidation, barangId);

  const barang = await prismaClient.barang.findFirst({
    where: {
      id: barangId,
    },
    select: {
      id: true,
      kode: true,
      nama: true,
      harga: true,
    },
  });

  if (!barang) {
    throw new ResponseError(404, "barang is not found");
  }

  return barang;
};

const list = async () => {
  return prismaClient.barang.findMany({
    select: {
      id: true,
      kode: true,
      nama: true,
      harga: true,
    },
  });
};

export default { create, get, list };
