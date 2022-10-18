const daosFactory = require("../../../models/daos/daos.factory");
const Dto = require("../../../models/dtos/index.dto");
const Repository = require("../../../models/repositories/index.repository");
const { encrypt, compareEncrypted } = require("../../../utils/bcrypt.utils");

class UserServices {
	constructor() {
		this.dao = {
			cart: daosFactory().cart,
			user: daosFactory().user,
		};
		this.dto = {
			generate: new Dto().generate,
			generic: new Dto().generic,
		};
		this.repo = {
			cart: new Repository().cart,
			order: new Repository().order,
			product: new Repository().product,
			user: new Repository().user,
		};
	}

	//Logeo del usuario.
	async login({ email, password }) {
		const user = await this.dao.user.getByEmail(email);
		if (!user || !(await compareEncrypted(password, user.password)))
			return { user: {}, error: true };
		return { user, error: false };
	}

	/*    Registra el usuario y se genera un carrito. (se puede ignorar la creación del carrito desde variable de entorno ".env")                               */
	async signup(
		email,
		{ password, repeatPassword },
		user,
		createCartTogetherWithUser
	) {
		if (password != repeatPassword) return { user: {}, cart: {}, error: true };
		let createdUser;
		let createdCart;
		try {
			const creatingUser = this.dto.generate.user(
				{ email, password: await encrypt(password) },
				user
			);
			createdUser = await this.repo.user.create(
				this.dto.generic.create(creatingUser)
			);
			if (!createCartTogetherWithUser) {
				const creatingCart = this.dto.generate.cart({
					idUser: createdUser._id,
					address: createdUser.address,
				});
				createdCart = await this.repo.cart.create(
					this.dto.generic.create(creatingCart)
				);
			}
			return { user: createdUser, cart: createdCart, error: false };
		} catch (error) {
			return { user: createdUser || {}, cart: createdCart || {}, error: true };
		}
	}

	//  Elimina el usuario y el carrito en caso de que fueran creados luego de detectar un error al registrar un usuario.
	async unregistered(idUser, idCart) {
		if (idUser) {
			const userFound = await this.dao.user.getById(idUser);
			if (userFound) await this.dao.user.deleteById(idUser);
		}
		if (idCart) {
			const cartFound = await this.dao.cart.getById(idCart);
			if (cartFound) await this.dao.cart.deleteById(idCart);
		}
		return true;
	}

	// Se asegura de eliminar el usuario y el carrito en caso fueran creados luego de detectar un error al registrar un usuario.
	async update(idUser, user) {
		const updatingUser = async (dataToUpdate, updater) => {
			if (updater.firstname) dataToUpdate.firstname = updater.firstname;
			if (updater.lastname) dataToUpdate.lastname = +updater.lastname;
			if (updater.birth) dataToUpdate.birth = updater.birth;
			if (updater.email) {
				const allUserOrders = await this.repo.order.get({
					email: dataToUpdate.email,
					all: true,
				});
				for (let i = 0; i < allUserOrders.length; i++) {
					const order = allUserOrders[i];
					order.author = updater.email;
					await this.repo.order.update(order._id, order);
				}
				dataToUpdate.email = updater.email;
			}
			if (updater.password)
				dataToUpdate.password = await encrypt(updater.password);
			if (updater.avatar) dataToUpdate.avatar = updater.avatar;
			if (updater.phone) dataToUpdate.phone = updater.phone;
			if (updater.address) {
				const cartFound = await this.repo.cart.get({ author: idUser });
				cartFound.address = updater.address;
				dataToUpdate.address = updater.address;
				await this.repo.cart.update(cartFound._id, cartFound);
			}
			return dataToUpdate;
		};
		const userFound = await this.repo.user.get({ id: idUser });
		const updatedUser = await updatingUser(userFound, user);
		const message = await this.repo.user.update(
			idUser,
			this.dto.generic.update(updatedUser)
		);
		return message;
	}
}

module.exports = UserServices;
