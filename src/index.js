const myServer = require("./app");
const { mode } = require("./utils/args.utils");

//Corre el servidor en modo Fork o Cluster de acuerdo la configuracion

if (mode == "cluster") {
	const cluster = require("cluster");
	const qty_CPUs = require("os").cpus().length;
	if (cluster.isPrimary) {
		for (let i = 0; i < qty_CPUs; i++) {
			cluster.fork();
		}
		cluster.on("exit", (worker, code) => cluster.fork());
	} else myServer();
} else if (mode == "fork") myServer();
else throw new Error(`The modality entered [${mode}] is not supported.`);
