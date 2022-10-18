require("dotenv").config();

const {
	ADMIN_EMAIL,
	ADMIN_PASS,
	DB_DEPLOY,
	DB_NAME,
	DB_MAIL,
	DB_PASS,
	DB_PERSISTENCE_SERVER,
	DB_PERSISTENCE_TYPE,
	NODE_ENV,
	PORT,
	SESSION_NAME,
	SESSION_SECRET,
	SESSION_TIMEOUT,
} = process.env;
let { CREATE_CART_TOGETHER_WITH_USER } = process.env;

const testData = [
	{ key: "ADMIN_EMAIL", value: ADMIN_EMAIL },
	{ key: "ADMIN_PASS", value: ADMIN_PASS },
	{ key: "DB_DEPLOY", value: DB_DEPLOY },
	{ key: "DB_NAME", value: DB_NAME },
	{ key: "DB_MAIL", value: DB_MAIL },
	{ key: "DB_PASS", value: DB_PASS },
	{ key: "DB_PERSISTENCE_SERVER", value: DB_PERSISTENCE_SERVER },
	{ key: "DB_PERSISTENCE_TYPE", value: DB_PERSISTENCE_TYPE },
	{ key: "SESSION_NAME", value: SESSION_NAME },
	{ key: "SESSION_SECRET", value: SESSION_SECRET },
	{ key: "SESSION_TIMEOUT", value: SESSION_TIMEOUT },
];
testData.forEach((e) => {
	if (!e.value) throw new Error(`[${e.key}] has not been assigned.`);
});

if (CREATE_CART_TOGETHER_WITH_USER == "true")
	CREATE_CART_TOGETHER_WITH_USER = true;
else if (CREATE_CART_TOGETHER_WITH_USER == "false")
	CREATE_CART_TOGETHER_WITH_USER = false;
else CREATE_CART_TOGETHER_WITH_USER = true;

module.exports = {
	ADMIN_EMAIL,
	ADMIN_PASS,
	DB_DEPLOY,
	DB_NAME,
	DB_MAIL,
	DB_PASS,
	DB_PERSISTENCE_SERVER: DB_PERSISTENCE_SERVER.toLowerCase(),
	DB_PERSISTENCE_TYPE: DB_PERSISTENCE_TYPE.toLowerCase(),
	NODE_ENV: NODE_ENV.trim() || "development",
	PORT: +PORT || 3001,
	SESSION_NAME,
	SESSION_SECRET,
	SESSION_TIMEOUT: +SESSION_TIMEOUT,
	CREATE_CART_TOGETHER_WITH_USER,
};
