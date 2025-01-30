import salesService from "../service/sales-service.js";

const create = async (req, res, next) => {
  try {
    await salesService.create(req.body);
    res.status(201).json({ message: "transaction created" });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const salesId = req.params.salesId;

    const result = await salesService.get(salesId);

    res.status(200).json({
      data: result,
    });
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

const update = async (req, res, next) => {
  try {
    const salesId = req.params.salesId;

    await salesService.update(req.body, salesId);
    res.status(200).json({
      data: "OK",
    });
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

export default { create, get, search, update, remove };
