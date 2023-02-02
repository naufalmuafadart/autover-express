const mongoose = require('mongoose');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const MongooseValidator = require('../../../applications/validator/MongooseValidator');

class MongooseValidatorMongoose extends MongooseValidator {
  constructor() {
    super();
    this.checkId = this.checkId.bind(this);
    this.validateId = this.validateId.bind(this);
  }

  checkId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvariantError('Not a valid id');
    }
  }

  validateId(id) {
    try {
      this.checkId(id);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }
}

module.exports = MongooseValidatorMongoose;
