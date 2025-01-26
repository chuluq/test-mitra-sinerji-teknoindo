import express from "express";
import barangController from "../controller/barang-controller";

const publicRouter = new express.Router();

// Barang API
publicRouter.post("/api/barang", barangController.create);
publicRouter.get(`/api/barang/:barangId`, barangController.get);
// publicRouter.put(`/api/barang/:barangId`, barangController.update);
// publicRouter.delete(`/api/barang/:barangId`, barangController.remove);
publicRouter.get(`/api/barang`, barangController.list);

export { publicRouter };
