const env = require("../../utils/config/env.config");
const CloudDAOs = require('./cloud/cloud.dao');

let daoFactory;
switch(env.DB_PERSISTENCE_TYPE) {
  case 'file':
    daoFactory = new PostFileDAO();
    break;
  case 'memory':
    daoFactory = new PostMemoryDAO();
    break;
  case 'cloud':
    if(env.DB_PERSISTENCE_SERVER == "mongo" || env.DB_PERSISTENCE_SERVER == "firebase") {
      daoFactory = new CloudDAOs(env.DB_PERSISTENCE_SERVER); 
      break;
    } else throw new Error('please, you must choose a database: [MONGO | FIREBASE]');
  default:
    throw new Error('Invalid data source, please provide one of the following [MEMORY | FILE | CLOUD]');
}

module.exports = () => daoFactory;