const Service = require("../../api/services/index.service");
const sendEmail = require("../../utils/sendEmail.utils");

const service = new Service();

const login = async (email, password, done) => {
	try {
		const { user, error } = await service.user.login({ email, password });
		if (error) return done(null, false);
		done(null, user);
	} catch (error) {
		done(null, false);
	}
};

const signup = async (req, email, password, done) => {
	const { repeatPassword } = req.body;
	let idCart;
	let idUser;
	try {
		const { user, cart, error } = await service.user.signup(
			email,
			{ password, repeatPassword },
			req.body
		);
		idCart = cart?._id;
		idUser = user?._id;
		if (error) return done(null, false);
		await sendEmail({ user }, `New registered user`);
		return done(null, user);
	} catch (error) {
		// console.log(error);
		service.user.unregistered(idUser, idCart).then(() => done(null, false));
	}
};

module.exports = { login, signup };
