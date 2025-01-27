import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getCustomerValidation } from "../validation/customer-validation.js";
import { validate } from "../validation/validation.js";

const get = async (customerId) => {
  customerId = validate(getCustomerValidation, customerId);

  const customer = await prismaClient.customer.findFirst({
    where: {
      id: customerId,
    },
    select: {
      id: true,
      kode: true,
      nama: true,
      telp: true,
    },
  });

  if (!customer) {
    throw new ResponseError(404, "customer is not found");
  }

  return customer;
};

const list = async () => {
  return prismaClient.customer.findMany({
    select: {
      id: true,
      kode: true,
      nama: true,
      telp: true,
    },
  });
};

export default { get, list };
