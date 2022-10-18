const { Router } = require('express');
const auth = require('../../../api/middlewares/auth.middleware');
const isAdmin = require('../../../api/middlewares/isAdmin.middleware');
const Controller = require('../../../controllers/index.controller');

const router = Router();

const { product, cart, user } = new Controller().json;

class Routes {
  get products() {
    router.get(`/product`, auth, product.getProduct);
    router.get(`/product/:idProd`, auth, product.getProduct);
    router.get(`/product/:category`, auth, product.getProduct);
    router.post(`/product`, [auth, isAdmin], product.postProduct);
    router.put(`/product/:idProd`, [auth, isAdmin], product.putProduct);
    router.delete(`/product/:idProd`, [auth, isAdmin], product.deleteProduct);
    return router;
  }

  get carts() {
    router.get(`/cart`, auth, cart.getCart);
    router.get(`/cart/:idCartOrUser`, auth, cart.getCart);
    router.get(`/cart/:idCartOrUser/:idStock`, auth, cart.getProduct);
    router.post(`/cart/:idUser`, auth, cart.postCart);
    router.post(`/cart/:idCart/createOrder`, auth, cart.createOrder);
    router.put(`/cart/:idCartOrUser/addProduct/:idStock`, auth, cart.addProduct);
    router.put(`/cart/:idCartOrUser/removeProduct/:idStock`, auth, cart.removeProduct);
    router.delete(`/cart/:idCartOrUser`, [auth, isAdmin], cart.deleteCart);
    return router;
  }

  get users() {
    router.get(`/user`, auth, user.getUser);
    router.get(`/user/:idUser`, auth, user.getUser);
    router.post(`/user/`, auth, user.postUser);
    router.put(`/user/:idUser`, auth, user.putUser);
    router.delete(`/user/:idUser`, [auth, isAdmin], user.deleteUser);
    return router;
  }
}

module.exports = Routes;
