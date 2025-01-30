import Joi from "joi";

const createSalesValidation = Joi.object({
  kode: Joi.string().max(10).required(), // kode barang
  tgl: Joi.date().iso().required(),
  cust_id: Joi.number().positive().required(),
  subtotal: Joi.number().required(),
  diskon: Joi.number().optional(),
  ongkir: Joi.number().optional(),
  total_bayar: Joi.number().required(),
});

const updateSalesValidation = Joi.object({
  id: Joi.number().required(),
  kode: Joi.string().max(10).required(), // kode barang
  tgl: Joi.date().iso().required(),
  cust_id: Joi.number().positive().required(),
  subtotal: Joi.number().required(),
  diskon: Joi.number().optional(),
  ongkir: Joi.number().optional(),
  total_bayar: Joi.number().required(),
});

const salesDetailValidation = Joi.object().keys({
  sales_id: Joi.number().positive().required(),
  barang_id: Joi.number().positive().required(),
  harga_bandrol: Joi.number().required(),
  qty: Joi.number().positive().required(),
  diskon_pct: Joi.number().optional(),
  diskon_nilai: Joi.number().optional(),
  harga_diskon: Joi.number().optional(),
  total: Joi.number().required(),
});

const createSalesDetailValidation = Joi.object({
  sales_details: Joi.array().items(salesDetailValidation).min(1),
});

const getSalesValidation = Joi.number().positive().required();

const searchSalesValidation = Joi.object({
  name: Joi.string().optional(),
});

export {
  createSalesValidation,
  updateSalesValidation,
  searchSalesValidation,
  getSalesValidation,
  createSalesDetailValidation,
};
