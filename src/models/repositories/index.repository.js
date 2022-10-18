const CartRepository = require("./collections/cart.repository");
const MessageRepository = require("./collections/message.repository");
const OrderRepository = require("./collections/order.repository");
const ProductRepository = require("./collections/product.repository");
const StockRepository = require("./collections/stock.repository");
const UserRepository = require("./collections/user.repository");

class Repository {
  get cart() {
    return new CartRepository();
  }

  get message() {
    return new MessageRepository();
  }

  get order() {
    return new OrderRepository();
  }

  get product() {
    return new ProductRepository();
  }

  get stock() {
    return new StockRepository();
  }

  get user() {
    return new UserRepository();
  }
}

module.exports = Repository;