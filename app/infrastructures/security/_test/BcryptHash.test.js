const bcrypt = require('bcrypt');
const BcryptHash = require('../BcryptHash');
const InvariantError = require('../../../commons/exceptions/InvariantError');

describe('A BcryptHash class', () => {
  const bcryptHash = new BcryptHash(bcrypt);

  describe('A hashString function', () => {
    const plain_password = 'plain_password_123';

    it('should return correct hashedPassword', async () => {
      const hash = await bcryptHash.hashString(plain_password);
      expect(hash).not.toEqual(plain_password);
      expect(hash).not.toEqual('');
      expect(typeof hash).toEqual('string');
    });
  });

  describe('A validatePassword function', () => {
    const plain_password = 'plain_password_123';

    it('should not throw error when password is valid', async () => {
      const hashedPassword = await bcryptHash.hashString(plain_password);
      expect(() => bcryptHash.validatePassword(plain_password, hashedPassword))
        .not.toThrow(InvariantError);
    });

    it('should throw error when password is not valid', async () => {
      const hashedPassword = await bcryptHash.hashString(plain_password);
      expect(() => bcryptHash.validatePassword('other password', hashedPassword)).toThrow(InvariantError);
    });
  });
});
