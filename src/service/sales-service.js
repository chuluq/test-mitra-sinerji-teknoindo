import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createSalesDetailValidation,
  createSalesValidation,
  getSalesValidation,
  searchSalesValidation,
} from "../validation/sales-validation.js";
import { validate } from "../validation/validation.js";

const get = async (salesId) => {
  salesId = validate(getSalesValidation, salesId);

  const sales = await prismaClient.sales.findFirst({
    where: {
      id: salesId,
    },
    select: {
      id: true,
      kode: true,
      cust_id: true,
      total_bayar: true,
      tgl: true,
      subtotal: true,
      diskon: true,
      ongkir: true,
      no_transaksi: true,
      customer: true,
      sales_details: true,
    },
  });

  if (!sales) {
    throw new ResponseError(404, "sales is not found");
  }

  return sales;
};

const remove = async (salesId) => {
  salesId = validate(getSalesValidation, salesId);

  const totalInDatabase = await prismaClient.sales.count({
    where: {
      id: salesId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "transaction is not found");
  }

  const deleteSalesDetails = prismaClient.salesDetail.deleteMany({
    where: {
      sales_id: salesId,
    },
  });

  const deleteSales = prismaClient.sales.delete({
    where: {
      id: salesId,
    },
  });

  return await prismaClient.$transaction([deleteSalesDetails, deleteSales]);
};

const search = async (request) => {
  request = validate(searchSalesValidation, request);

  const filters = [];

  if (request?.name) {
    filters.push({
      customer: {
        nama: {
          contains: request?.name,
          mode: "insensitive",
        },
      },
    });
  }

  return await prismaClient.sales.findMany({
    where: {
      AND: filters,
    },
    select: {
      id: true,
      kode: true,
      tgl: true,
      cust_id: true,
      subtotal: true,
      diskon: true,
      ongkir: true,
      total_bayar: true,
      no_transaksi: true,
      customer: {
        select: {
          nama: true,
        },
      },
      _count: {
        select: {
          sales_details: true,
        },
      },
    },
  });
};

const create = async (request) => {
  const {
    sales_details,
    kode,
    tgl,
    cust_id,
    subtotal,
    diskon,
    ongkir,
    total_bayar,
  } = request;

  const validatedSales = validate(createSalesValidation, {
    kode,
    tgl,
    cust_id,
    subtotal,
    diskon,
    ongkir,
    total_bayar,
  });
  const resSales = await prismaClient.sales.create({
    data: validatedSales,
  });

  sales_details.forEach((detail) => {
    detail.sales_id = resSales.id;
  });

  const salesDetails = validate(createSalesDetailValidation, {
    sales_details,
  });

  return prismaClient.salesDetail.createMany({
    data: salesDetails.sales_details,
  });
};

export default { get, create, search, remove };
