const Service = require("../../api/services/index.service");
const Repository = require("../../models/repositories/index.repository");
const STATUS = require("../../utils/constants/status.constants");
const { apiResponse } = require("../../utils/response.utils");

const repo = new Repository();
const service = new Service();

class ProductController {
  async getProduct(req, res, next) {
    const { code: status } = STATUS.OK;
    const { idProd, category } = req.params;
    try {
      if(idProd) return res.status(status).json(apiResponse(await repo.stock.get({ id: idProd }), status));
      if(category) return res.status(status).json(apiResponse(await repo.stock.get({ category }), status));
      res.status(status).json(apiResponse(await repo.stock.get({}), status));
    }
    catch(error) { next(error); }
  }

  async postProduct(req, res, next) {
    const { code: status } = STATUS.CREATED;
    try {
      const response = await service.stock.addProductToStock(req.body);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }

  async putProduct(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { params: { idProd }, body } = req;
    try {
      const response = await service.stock.update(idProd, body);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }

  async deleteProduct(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { idProd } = req.params;
    try {
      const response = await repo.stock.delete(idProd);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }
}

module.exports = new ProductController();