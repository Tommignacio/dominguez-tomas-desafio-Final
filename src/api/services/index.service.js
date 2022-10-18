const CartServices = require("./collections/cart.service");
const MessageServices = require("./collections/message.service");
const StockServices = require("./collections/stock.service");
const UserServices = require("./collections/user.service");

class Service {
  get cart() {
    return new CartServices();
  }

  get message() {
    return new MessageServices()
  }

  get stock() {
    return new StockServices();
  }

  get user() {
    return new UserServices();
  }
}

module.exports = Service;