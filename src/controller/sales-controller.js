import salesService from "../service/sales-service.js";

const create = async (req, res, next) => {
  try {
    await salesService.create(req.body);
    res.status(201).json({ message: "transaction created" });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
    };

    const result = await salesService.search(request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const salesId = req.params.salesId;

    await salesService.remove(salesId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default { create, search, remove };
