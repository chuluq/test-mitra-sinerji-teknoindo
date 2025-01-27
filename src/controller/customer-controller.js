import customerService from "../service/customer-service.js";

const create = async (req, res, next) => {
  try {
    const result = await customerService.create(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const result = await customerService.get(customerId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const list = async (_req, res, next) => {
  try {
    const result = await customerService.list();

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, list };
