// const dbConfig = require("../../../utils/config/db.config");

// class FileDAO {
//   static #dbInstance;
//   constructor() {
//     console.log(`[file] Simulating connecting to "${env.DB_NAME}" database...`);
//     if(!FileDAO.#dbInstance) {
//       dbConfig.file.connect()
//       // .connect(dbConfig.mongodb.connect())
//       //   .then(() => console.log(`Connected to the "${env.DB_NAME}" database!`))
//       //   .catch(error => { throw new Error("An error occurred while connecting the database: ", error) })
//       FileDAO.#dbInstance = this;
//       return this;
//     } else return FileDAO.#dbInstance;
//   }
//   get cart() {
//     return ("cart");
//   }

//   get product() {
//     return ("product");
//   }
//   get stock() {
//     return ("stock");
//   }

//   get message() {
//     return ("message");
//   }

//   get order() {
//     return ("order");
//   }

//   get user() {
//     return ("user");
//   }
// }

// module.exports = FileDAO;