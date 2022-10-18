/*Verifica si el usuario está autenticado */
const auth = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
};

module.exports = auth;
