import {
  createBarangValidation,
  getBarangValidation,
} from "../validation/barang-validation";
import { validate } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const checkBarangMustExists = async (barangId) => {
  barangId = validate(getBarangValidation, barangId);

  const totalBarangInDatabase = await prismaClient.barang.count({
    where: {
      id: barangId,
    },
  });

  if (totalBarangInDatabase !== 1) {
    throw new ResponseError(404, "barang is not found");
  }

  return barangId;
};

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
  barangId = await checkBarangMustExists(barangId);

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
