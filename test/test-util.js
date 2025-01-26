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

export const createTestCustomer = async () => {
  await prismaClient.customer.create({
    data: {
      kode: "test",
      nama: "test",
      telp: "62819555831",
    },
  });
};

export const createManyTestCustomer = async () => {
  for (let i = 0; i < 3; i++) {
    await prismaClient.customer.create({
      data: {
        kode: `test U00${i}`,
        nama: `test ${i}`,
        telp: "62819555831",
      },
    });
  }
};

export const getTestCustomer = async () => {
  return prismaClient.customer.findFirst({
    where: {
      kode: "test",
    },
  });
};

export const removeAllTestCustomer = async () => {
  await prismaClient.customer.deleteMany();
};
