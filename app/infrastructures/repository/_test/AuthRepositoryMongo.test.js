require('dotenv').config();
const mongoose = require('mongoose');
const Auth = require('../../../domains/mongoose_model/Auth');
const AuthRepositoryMongo = require('../AuthRepositoryMongo');
const NotFoundError = require('../../../commons/exceptions/NotFoundError');
const AuthCollectionTestHelper = require('../../../../test/AuthCollectionTestHelper');

describe('An Auth Repository Mongo', () => {
  const authRepositoryMongo = new AuthRepositoryMongo(Auth);

  beforeAll(async () => {
    mongoose.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await AuthCollectionTestHelper.emptyCollection();
    mongoose.connection.close();
  });

  describe('addAuth function', () => {
    it('should add auth to database', async () => {
      // Arrange
      const fakeToken = 'xxxYYY';

      // Action
      await authRepositoryMongo.addAuth({ refresh_token: fakeToken });

      // Assert
      expect(() => AuthCollectionTestHelper.validateAuthExist(fakeToken)).not.toThrowError();
    });
  });

  describe('validateRefreshTokenExist function', () => {
    it('should throw error when refresh token does not exist', async () => {
      // Arrange
      const fakeToken = 'ey.{}.signature';

      // Action
      await AuthCollectionTestHelper.addAuth({});

      // Assert
      await expect(authRepositoryMongo.validateRefreshTokenExist(fakeToken))
        .rejects.toThrowError(NotFoundError);
    });

    it('should not throw error when refresh token exist', async () => {
      // Arrange
      const fakeToken = 'xxxYYY';

      // Action
      await AuthCollectionTestHelper.addAuth({});

      // Assert
      expect(async () => authRepositoryMongo
        .validateRefreshTokenExist(fakeToken)).not.toThrowError();
    });
  });
});
