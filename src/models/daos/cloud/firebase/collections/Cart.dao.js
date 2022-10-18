import { errorLogger } from '../../utils/config/logger.config.js';
import STATUS from '../../utils/constants/api.constants.js';
import formatResponse from '../../utils/formatter/send.format.js';
import MongoDBContainer from '../containers/Mongodb.container.js';
import CartSchema from '../schemas/Cart.schema.js';

const collection = 'Cart';

class CartsDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, CartSchema);
    if (!CartsDao.instance) {
      CartsDao.instance = this;
      return this;
    }
    else return CartsDao.instance; 
  }
  
  async updateById(id, products) {
    try {
      const document = await this.model.updateOne({ id }, { products }).lean();
      if (!document) {
        const message = `Resource with id ${id} does not exist in our records`;
        errorLogger.error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
        throw new Error(JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message)));
      } else return document;
    }
    catch(error) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }
};

export default CartsDao;