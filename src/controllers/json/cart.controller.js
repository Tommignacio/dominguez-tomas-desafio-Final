const Service = require("../../api/services/index.service");
const Dto = require("../../models/dtos/index.dto");
const Repository = require("../../models/repositories/index.repository");
const STATUS = require("../../utils/constants/status.constants");
const { apiResponse } = require("../../utils/response.utils");
const sendEmail = require("../../utils/sendEmail.utils");

const dto = new Dto();
const repo = new Repository();
const service = new Service();

class CartController {
  async getCart(req, res, next) {
    const { code: status } = STATUS.OK;
    const { idCartOrUser } = req.params;
    try {
      if(idCartOrUser) {
        const cartFound = await service.cart.getCartById(idCartOrUser);
        return res.status(status).json(apiResponse(cartFound, status));
      }
      res.status(status).json(apiResponse(await repo.cart.get({}), status));
    }
    catch(error) { next(error); }
  }
  async getProduct(req, res, next) {
    const { code: status } = STATUS.OK;
    const { idCartOrUser, idStock } = req.params;
    try {
      const productFound = await service.cart.getProductInCartById(idCartOrUser, idStock);
      return res.status(status).json(apiResponse(productFound, status));
    }
    catch(error) { next(error); }
  }

  async postCart(req, res, next) {
    const { code: status } = STATUS.CREATED;
    const { idUser } = req.params;
    try {
      const response = await service.cart.createCart(idUser);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }

  async createOrder(req, res, next) {
    const { code: status } = STATUS.CREATED;
    const { idCart } = req.params;
    try {
      const cartFound = await repo.cart.populate({ id: idCart }, "author");
      const user = { ...cartFound.author }
      const order = await service.cart.generatingOrder(idCart, user._doc);
      const voucher = await service.cart.getVoucher(order._id, req.user);
      await sendEmail({ voucher }, `Thank You For Your Order! ${req.user.firstname} ${req.user.lastname}`);
      res.status(status).json(apiResponse(order, status));
    }
    catch(error) { next(error); }
  }

  async addProduct(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { idCartOrUser, idStock } = req.params;
    try {
      const cartFound = await service.cart.getCartById(idCartOrUser);
      const response = await service.cart.addToCart(idStock, cartFound.author, 1);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }

  async removeProduct(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { idCartOrUser, idStock } = req.params;
    try {
      const cartFound = await service.cart.getCartById(idCartOrUser);
      const response = await service.cart.removeOneProductFromCart(idStock, cartFound.author);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }

  async deleteCart(req, res, next) {
    const { code: status } = STATUS.ACEPTED;
    const { idCartOrUser } = req.params;
    try {
      const cartFound = await service.cart.getCartById(idCartOrUser);
      const response = await repo.cart.delete(cartFound._id);
      res.status(status).json(apiResponse(response, status));
    }
    catch(error) { next(error); }
  }
}
module.exports = new CartController();