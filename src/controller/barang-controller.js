import barangService from "../service/barang-service";

const create = async (req, res, next) => {
  try {
    const result = await barangService.create(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const barangId = req.params.barangId;

    const result = await barangService.get(barangId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await barangService.list();

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, list };
