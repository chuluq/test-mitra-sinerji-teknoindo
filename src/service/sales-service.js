import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createSalesDetailValidation,
  createSalesValidation,
  getSalesValidation,
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

const list = async () => {
  return await prismaClient.sales.findMany({
    include: {
      customer: {
        select: { nama: true },
      },
      _count: {
        select: { sales_details: true },
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

export default { get, create, list, remove };
