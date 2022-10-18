import { errorLogger } from '../../utils/config/logger.config.js';
import STATUS from '../../utils/constants/api.constants.js';
import formatResponse from '../../utils/formatter/send.format.js';
import MongoDBContainer from '../containers/Mongodb.container.js';
import ProductSchema from '../schemas/Product.schema.js';

const collection = 'Product';

class ProductsDao extends MongoDBContainer {
  static instance;
  constructor() {
    super(collection, ProductSchema);
    if (!ProductsDao.instance) {
      ProductsDao.instance = this;
      return this;
    }
    else return ProductsDao.instance; 
  }
  
  async getAll(filter = {}) {
    try{
      const documents = await this.model.find(filter, { __v: 0 }).lean();
      return documents;
    }
    catch(error) {
      errorLogger.error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
      throw new Error(JSON.stringify(formatResponse(true, STATUS.INTERNAL_ERROR, error.message)));
    }
  }

  async getByNameProducts(title) {
    try {
      const document = await this.model.find({ title }, { __v: 0 }).lean();
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

  async getByPriceProducts(price) {
    try {
      const document = await this.model.find({ price: { $lt: price } }, { __v: 0 }).lean();
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

export default ProductsDao;