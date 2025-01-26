import Joi from "joi";

const createCustomerValidation = Joi.object({
  kode: Joi.string().max(10).required(),
  nama: Joi.string().max(100).required(),
  telp: Joi.string().max(20).optional(),
});

const getCustomerValidation = Joi.number().positive().required();

export { createCustomerValidation, getCustomerValidation };
