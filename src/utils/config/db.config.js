const path = require("path");
const { cwd } = require("process");
const fs = require("fs");
const env = require("./env.config");

module.exports = {
	mongodb: {
		connect: () =>
			`mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_DEPLOY}.lefks.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
		connectTo: (database) =>
			`mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_DEPLOY}.lefks.mongodb.net/${database}?retryWrites=true&w=majority`,
		simulateConnection: (database) => {
			if (database)
				return `mongodb+srv://${env.DB_MAIL}:<PASSWORD>@${env.DB_DEPLOY}.lefks.mongodb.net/${database}?retryWrites=true&w=majority`;
			return `mongodb+srv://${env.DB_MAIL}:<PASSWORD>@${env.DB_DEPLOY}.lefks.mongodb.net/ecommerce?retryWrites=true&w=majority`;
		},
	},
	firebase: {
		connect: () =>
			path.resolve(
				cwd() + "/models/daos/cloud/firebase/TOKEN/firebase.token.json"
			),
	},
	file: {
		connect: async () => {
			try {
				const ROUTE = path.resolve(
					cwd() + `/models/daos/file/DBs/${env.DB_NAME}`
				);
				const collections = await readFolder(ROUTE);
				if (!collections) await fs.promises.mkdir(ROUTE);
				return ROUTE;
			} catch (error) {
				throw new Error(`Error connecting to server [${env.DB_NAME}]`);
			}
		},
		newCollection: async (collection) => {
			const NAME = collection.toLowerCase().replace(/\s+/g, "-");
			const ROUTE = path.resolve(
				cwd() + `/models/daos/file/DBs/${env.DB_NAME}`
			);
			const collections = await readFolder(ROUTE);
			for (const collection of collections) {
				if (collection == `${NAME}.json`)
					throw new Error(
						`Error creating collection. \nThe collection already exists.`
					);
			}
			try {
				await fs.promises.writeFile(
					`${ROUTE}/${NAME}.json`,
					JSON.stringify([], null, 2)
				);
				return true;
			} catch (error) {
				throw new Error(
					`Error creating collection. \nMake sure to use a valid string.`
				);
			}
		},
	},
	memory: {
		connect: () => [],
	},
};
