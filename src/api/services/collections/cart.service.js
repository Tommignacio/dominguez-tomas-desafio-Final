const CustomError = require("../../../utils/error.utils");
const Dto = require("../../../models/dtos/index.dto");
const Repository = require("../../../models/repositories/index.repository");
const STATUS = require("../../../utils/constants/status.constants");
const daosFactory = require("../../../models/daos/daos.factory");

class CartServices {
	constructor() {
		this.dao = {
			cart: daosFactory().cart,
			cart: daosFactory().cart,
		};
		this.dto = {
			generate: new Dto().generate,
			generic: new Dto().generic,
		};
		this.repo = {
			cart: new Repository().cart,
			order: new Repository().order,
			stock: new Repository().stock,
			user: new Repository().user,
		};
	}

	/*Retorna un carrito encontrado por un ID.*/
	async getCartById(idCartOrUser, notReturnError) {
		let cartFound;
		const cartFoundByIdCart = await this.dao.cart.getById(idCartOrUser);
		if (!cartFoundByIdCart) {
			const cartFoundByIdUser = await this.dao.cart.getByAuthor(idCartOrUser);
			if (!cartFoundByIdUser) {
				if (notReturnError) return false;
				throw new CustomError(
					STATUS.NOT_FOUND,
					"the ID entered doesn't match any cart in our database"
				);
			} else cartFound = cartFoundByIdUser;
		} else cartFound = cartFoundByIdCart;
		return cartFound;
	}

	//crea carrito por usuario
	async createCart(idUser) {
		const cartFound = await this.dao.cart.getByAuthor(idUser);
		if (!cartFound) {
			const { address } = await this.repo.user.get({ id: idUser });
			const creatingCart = this.dto.generate.cart({ idUser, address });
			const createdCart = await this.repo.cart.create(
				this.dto.generic.create(creatingCart)
			);
			return createdCart;
		}
		throw new CustomError(
			STATUS.ACCESS_PROHIBITED,
			"The user already has a cart."
		);
	}

	//devuelve producto del carrito por id
	async getProductInCartById(idCartOrUser, idStock) {
		const cartFound = await this.getCartById(idCartOrUser);
		const productStockFound = cartFound.items.find(
			(e) => e.product == idStock.toString()
		);
		if (!productStockFound)
			throw new CustomError(
				STATUS.NOT_FOUND,
				"The ID entered doesn't match any product belonging to this cart."
			);
		return productStockFound;
	}

	//devuelve carrrito por id usuario
	async getProductInCart(idUser) {
		const cartFound = await this.repo.cart.get({ author: idUser });
		if (cartFound.items.length > 0)
			return await this.repo.cart.populate({ author: idUser }, "items");
		return cartFound;
	}

	/*    Genera un voucher especial para enviar el mail de la orden y para renderizar una vista de los productos comprados.             */
	async getVoucher(idOrder, user) {
		const populatedOrder = await this.repo.order.populate(
			{ id: idOrder },
			"items"
		);
		const allProductsPurchased = populatedOrder.items.map((e) => e.products);
		let mappedProducts = [];
		for (let i = 0; i < allProductsPurchased.length; i++) {
			mappedProducts = [...mappedProducts, ...allProductsPurchased[i]];
		}
		const productPrice = mappedProducts.map((product) => product.price);
		const totalPrice = productPrice.reduce(
			(previousVal, currentVal) => previousVal + currentVal
		);
		const response = { products: mappedProducts, total: totalPrice };
		return this.dto.generate.voucher(populatedOrder, response, user);
	}

	// eliminacion de un producto del carrito
	async removeOneProductFromCart(idStock, idUser) {
		const cartFound = await this.repo.cart.get({ author: idUser });
		const productStockIndexFoundInCart = cartFound.items.findIndex(
			(e) => e.product.toString() == idStock.toString()
		);
		if (productStockIndexFoundInCart >= 0)
			cartFound.items[productStockIndexFoundInCart].amount--;
		else
			throw new CustomError(
				STATUS.NOT_FOUND,
				"The product stock ID does not exist in the database."
			);
		if (cartFound.items[productStockIndexFoundInCart].amount == 0)
			cartFound.items.splice(productStockIndexFoundInCart, 1);
		await this.repo.cart.update(
			cartFound._id,
			this.dto.generic.update(cartFound)
		);
		return cartFound;
	}

	//Agrega un stock de productos al carrito y aumenta la cantidad de productos
	async addToCart(idStock, idUser, qty) {
		const productStockFound = await this.repo.stock.get({ id: idStock });
		const cartFound = await this.repo.cart.get({ author: idUser });
		const productStockFoundInCart = cartFound.items.find(
			(e) => e?.product.toString() == productStockFound._id.toString()
		);
		if (!productStockFoundInCart)
			cartFound.items.push({ product: productStockFound._id, amount: +qty });
		else productStockFoundInCart.amount += +qty;
		if (productStockFound.stock < productStockFoundInCart?.amount)
			throw new CustomError(
				STATUS.BAD_REQUEST,
				"Requested quantity exceeds stock"
			);
		await this.repo.cart.update(cartFound._id, cartFound);
		return cartFound;
	}

	// Crea una nueva orden siempre y cuando el carrito tenga 1 o más productos
	async generatingOrder(idCart, user) {
		const cartFound = await this.repo.cart.populate({ id: idCart }, "items");
		if (cartFound.items.length == 0)
			throw new CustomError(
				STATUS.BAD_REQUEST,
				"You cannot make the purchase if you don't have selected products."
			);
		if (cartFound.author.toString() != user._id.toString())
			throw new CustomError(
				STATUS.NOT_AUTHORIZED,
				"This cart doesn't belong to you."
			);
		const repoOrder = await this.repo.order.get({});
		let numberOfOrder;
		if (repoOrder.length == 0) numberOfOrder = 1;
		else {
			const newOrder = repoOrder.map((product) => product.order).sort();
			numberOfOrder = newOrder.pop() + 1;
		}
		const iteratingProductsToBuy = cartFound.items.map((e) => ({
			amount: e.amount,
			products: e.product.items,
		}));
		for (let i = 0; i < iteratingProductsToBuy.length; i++) {
			const stock = iteratingProductsToBuy[i];
			stock.products.splice(
				stock.amount - 1,
				stock.products.length - stock.amount
			);
		}
		const creatingOrder = this.dto.generate.order({
			order: numberOfOrder,
			items: iteratingProductsToBuy,
			...user,
		});
		const createdOrder = await this.repo.order.create(
			this.dto.generic.create(creatingOrder)
		);
		/************************************************************************************************************************/
		/**/ await this.repo.cart.update(
			cartFound._id,
			this.dto.generic.update({ /*→*/ ...cartFound._doc /*←*/, items: [] })
		); /**/
		/**/ ////////// No entiendo porque retorna un objeto que desconozco al hacer "spread operator" al carrito. ////////// /**/
		/************************************************************************************************************************/
		return createdOrder;
	}
}

module.exports = CartServices;
