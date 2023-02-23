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

  describe('addUser function', () => {
    it('should add user to database', async () => {
      // Arrange
      const payload = {
        full_name: 'John Doe',
        phone_number: '81212341234',
        email: 'johndoe@gmail.com',
        password: 'SuperSecretPassword',
      };

      const userRepositoryMongo = new UserRepositoryMongo(User);

      // Action
      await userRepositoryMongo.addUser(payload);

      // Assert
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      expect(typeof user).toBe('object');
      expect(user.full_name).toEqual(payload.full_name);
      expect(user.phone_number).toEqual(payload.phone_number);
      expect(user.phone_number).toEqual(payload.phone_number);
    });
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

  describe('getUserFullName function', () => {
    it('should throw error when id not found', async () => {
      // Arrange
      const userRepository = new UserRepositoryMongo(User);
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(() => userRepository.getUserFullName(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should return correct user full name when id exist', async () => {
      // Arrange
      const payload = { full_name: 'John Doe', email: 'johndoe@gmail.com' };
      const userRepository = new UserRepositoryMongo(User);

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      const id = String(user._id);

      // Assert
      const full_name = await userRepository.getUserFullName(id);
      expect(full_name).toEqual(payload.full_name);
    });
  });

  describe('getUserPhoneNumber function', () => {
    it('should throw error when id not found', async () => {
      // Arrange
      const userRepository = new UserRepositoryMongo(User);
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(() => userRepository.getUserPhoneNumber(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should return correct user`s phone number when id exist', async () => {
      // Arrange
      const payload = { phone_number: '81212341234', email: 'johndoe@gmail.com' };
      const userRepository = new UserRepositoryMongo(User);

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      const id = String(user._id);

      // Assert
      const phone_number = await userRepository.getUserPhoneNumber(id);
      expect(phone_number).toEqual(payload.phone_number);
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
