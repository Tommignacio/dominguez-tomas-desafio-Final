class Controller {
	//Retorna respuestas tipo json. (Pensado para api-restfull).
	get json() {
		return {
			cart: require("./json/cart.controller"),
			product: require("./json/product.controller"),
			user: require("./json/user.controller"),
		};
	}

	//Retorna un middleware de autenticación.
	get authenticate() {
		return {
			local: require("./passport/local.controller"),
		};
	}

	// Retorna vistas.
	get views() {
		return {
			...require("./views/chat.controller"),
			...require("./views/server.controller"),
			...require("./views/session.controller"),
			...require("./views/store.controller"),
		};
	}

	// Inicializa la app con socke.io.
	get ws() {
		return {
			message: require("./ws/message.controller"),
		};
	}
}

module.exports = Controller;
