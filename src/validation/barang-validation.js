import Joi from "joi";

const createBarangValidation = Joi.object({
  kode: Joi.string().max(10).required(),
  nama: Joi.string().max(100).required(),
  harga: Joi.number().required(),
});

const getBarangValidation = Joi.number().positive().required();

const updateBarangValidation = Joi.object({
  id: Joi.number().positive().required(),
  kode: Joi.string().max(10).required(),
  nama: Joi.string().max(100).required(),
  harga: Joi.number().required(),
});

export { createBarangValidation, getBarangValidation, updateBarangValidation };
