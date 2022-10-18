const { apiResponse } = require("../../utils/response.utils");

/* Retorna una respuesta tipo json para todos los errores generados. */
const errorMiddleware = (error, req, res, next) => {
	const { status, message, details } = error;
	const errorBack = {
		status: 500,
		message: "sorry, i couldn't avoid this error",
		details: message,
	};
	return res
		.status(+status || +errorBack.status)
		.json(status ? apiResponse({ message, details }, +status) : errorBack);
};

module.exports = errorMiddleware;
