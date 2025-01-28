import salesService from "../service/sales-service.js";

const create = async (req, res, next) => {
  try {
    await salesService.create(req.body);
    res.status(201).json({ message: "transaction created" });
  } catch (e) {
    next(e);
  }
};

const list = async (_req, res, next) => {
  try {
    const result = await salesService.list();

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export default { create, list };
