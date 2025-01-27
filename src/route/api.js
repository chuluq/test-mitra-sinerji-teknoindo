import express from "express";
import barangController from "../controller/barang-controller.js";
import customerController from "../controller/customer-controller.js";

const publicRouter = new express.Router();

// Barang API
publicRouter.post("/api/barang", barangController.create);
publicRouter.get(`/api/barang/:barangId`, barangController.get);
publicRouter.get(`/api/barang`, barangController.list);

// Customer API
publicRouter.post(`/api/customers`, customerController.create);
publicRouter.get(`/api/customers/:customerId`, customerController.get);
publicRouter.get(`/api/customers`, customerController.list);

// Sales API

export { publicRouter };
