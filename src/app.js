const Controller = require("./controllers/index.controller");
const cors = require("cors");
const env = require("./utils/config/env.config");
const express = require("express");
const passport = require("./api/middlewares/passport.middleware");
const path = require("path");
const router = require("./router/index.router");
const session = require("express-session");
const { InitTemplate } = require("./utils/template.utils");
const { PORT } = require("./utils/args.utils");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");
const { create: connectMongo } = require("connect-mongo");
const { engine } = require(`express-handlebars`);
const { mongodb } = require("./utils/config/db.config");

/*Ejecuta el servidor usando Express.   */

const appServer = () => {
	//--------------------------------------------
	// instancio servidor, socket y api
	const app = express();
	const httpServer = new HttpServer(app);
	const io = new Socket(httpServer);

	//--------------------------------------------
	// configuro el servidor
	const expressSession = session({
		name: env.SESSION_NAME,
		store: connectMongo({ mongoUrl: mongodb.connectTo("sessions") }),
		secret: [env.SESSION_SECRET],
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: env.SESSION_TIMEOUT },
	});
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.resolve(process.cwd(), "./public")));
	app.use(cors());
	app.use(expressSession);
	app.use(passport.initialize());
	app.use(passport.session());

	//--------------------------------------------
	// configuro el socket
	(async () => {
		await new Controller().ws.message.init(io, expressSession);
	})();

	//--------------------------------------------
	// configuro las plantillas
	app.engine(
		`hbs`,
		engine({
			extname: `hbs`,
			defaultLayout: `index.hbs`,
			layoutsDir: path.resolve(process.cwd(), `./views/hbs`),
			partialsDir: path.resolve(process.cwd(), `./views/hbs/partials`),
		})
	);
	app.set(`views`, `./views`);
	new InitTemplate(app);

	// rutas
	app.use(router);

	//--------------------------------------------
	// inicio el servidor
	const connectedServer = httpServer.listen(PORT, () =>
		console.log(
			`[${env.NODE_ENV}] Server is up and running on PORT: >>> ${PORT}`
		)
	);
	connectedServer.on("error", (error) =>
		console.log("There was an unexpected error in the server ", error)
	);
};

module.exports = appServer;
