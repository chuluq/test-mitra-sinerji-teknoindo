import { prismaClient } from "../src/application/database.js";

export const createTestBarang = async () => {
  await prismaClient.barang.create({
    data: {
      kode: "test",
      harga: 20000,
      nama: "test",
    },
  });
};

export const createManyTestBarang = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.barang.create({
      data: {
        kode: `test T00${i}`,
        nama: `test ${i}`,
        harga: 10000 + i,
      },
    });
  }
};

export const getTestBarang = async () => {
  return prismaClient.barang.findFirst({
    where: {
      kode: "test",
    },
  });
};

export const removeAllTestBarang = async () => {
  await prismaClient.barang.deleteMany();
};
