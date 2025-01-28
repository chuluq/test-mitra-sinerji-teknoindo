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

export const createTestSales = async () => {
  await prismaClient.sales.create({
    data: {
      kode: "12345",
      tgl: "2023-04-01T00:00:00.000Z",
      cust_id: 32,
      subtotal: 100000,
      diskon: 1000,
      ongkir: 5000,
      total_bayar: 104000,
    },
  });
};

export const createTestDetailSales = async (salesId) => {
  const sales_details = [
    {
      barang_id: 87,
      harga_bandrol: 100000,
      qty: 1,
      diskon_pct: 10,
      diskon_nilai: 10000,
      harga_diskon: 90000,
      total: 90000,
    },
  ];

  sales_details.forEach((detail) => {
    detail.sales_id = salesId;
  });

  await prismaClient.salesDetail.createMany({
    data: sales_details,
  });
};

export const createManyTestSales = async () => {
  for (let i = 0; i < 2; i++) {
    const result = await prismaClient.sales.create({
      data: {
        kode: "12345",
        tgl: "2023-04-01T00:00:00.000Z",
        cust_id: 32,
        subtotal: 100000,
        diskon: 1000,
        ongkir: 5000,
        total_bayar: 104000,
      },
    });

    const sales_details = [
      {
        barang_id: 87,
        harga_bandrol: 100000,
        qty: 1,
        diskon_pct: 10,
        diskon_nilai: 10000,
        harga_diskon: 90000,
        total: 90000,
      },
    ];

    sales_details.forEach((detail) => {
      detail.sales_id = result.id;
    });

    await prismaClient.salesDetail.createMany({
      data: sales_details,
    });
  }
};

export const removeAllTestSales = async () => {
  await prismaClient.salesDetail.deleteMany();
  await prismaClient.sales.deleteMany();
};
