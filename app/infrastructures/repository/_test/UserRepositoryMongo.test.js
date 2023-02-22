require('dotenv').config();
const mongoose = require('mongoose');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const User = require('../../../domains/mongoose_model/User');
const UserRepositoryMongo = require('../UserRepositoryMongo');
const UserCollectionTestHelper = require('../../../../test/UserCollectionTestHelper');

describe('UserRepositoryMongo', () => {
  beforeAll(async () => {
    mongoose.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await UserCollectionTestHelper.emptyCollection();
    mongoose.connection.close();
  });

  describe('getUserByEmail function', () => {
    it('should throw error when email does not exist', async () => {
      // Arrange
      const userRepositoryMongo = new UserRepositoryMongo(User);

      // Action
      await UserCollectionTestHelper.addUser({});

      // Action and assert
      await expect(async () => userRepositoryMongo.getUserByEmail('xyz@gmail.com')).rejects.toThrowError(InvariantError);
    });

    it('should not throw error when email does not exist', async () => {
      // Arrange
      const userRepositoryMongo = new UserRepositoryMongo(User);
      const email = 'johndoe@gmail.com';
      const payload = { email };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await userRepositoryMongo.getUserByEmail(email);

      // Assert
      expect(user).toHaveProperty('email');
      expect(user.email).toEqual(email);
    });
  });

  describe('validateEmailExist function', () => {
    it('should throw error when email does not exist', async () => {
      // Arrange
      const email1 = 'johndoe@gmail.com';
      const email2 = 'autover@gmail.com';
      const userRepositoryMongo = new UserRepositoryMongo(User);

      // Action and assert
      await UserCollectionTestHelper.addUser({ email: email1 });
      await expect(async () => userRepositoryMongo
        .validateEmailExist(email2)).rejects.toThrowError(InvariantError);
    });

    it('should not throw error when email exist', async () => {
      // Arrange
      const email = 'johndoe@gmail.com';
      const userRepositoryMongo = new UserRepositoryMongo(User);

      // Action and assert
      await UserCollectionTestHelper.addUser({ email });
      expect(async () => userRepositoryMongo
        .validateEmailExist(email)).not.toThrowError(InvariantError);
    });
  });
});