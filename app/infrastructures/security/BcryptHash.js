const bcrypt = require('bcrypt');
const InvariantError = require('../../commons/exceptions/InvariantError');

class BcryptHash {
  validatePassword(password, hashedPassword) {
    if (!bcrypt.compareSync(password, hashedPassword)) {
      throw new InvariantError('Password incorrect');
    }
  }

  async hashString(text) {
    return bcrypt.hash(text, 10);
  }
}

module.exports = BcryptHash;
