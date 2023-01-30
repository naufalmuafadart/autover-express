const InvariantError = require('../../commons/exceptions/InvariantError');
const PasswordHash = require('../../applications/security/PasswordHash');

class BcryptHash extends PasswordHash {
  constructor(bcrypt) {
    super();
    this._bcrypt = bcrypt;
  }

  async hashString(text) {
    return this._bcrypt.hash(text, 10);
  }

  validatePassword(password, hashedPassword) {
    if (!this._bcrypt.compareSync(password, hashedPassword)) {
      throw new InvariantError('Password incorrect');
    }
  }
}

module.exports = BcryptHash;
