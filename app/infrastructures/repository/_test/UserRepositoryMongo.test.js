require('dotenv').config();
const mongoose = require('mongoose');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const User = require('../../../domains/mongoose_model/User');
const UserRepositoryMongo = require('../UserRepositoryMongo');
const UserCollectionTestHelper = require('../../../../test/UserCollectionTestHelper');

describe('UserRepositoryMongo', () => {
  const userRepository = new UserRepositoryMongo(User);

  beforeAll(async () => {
    mongoose.connect(String(process.env.MONGO_URL));
  });

  afterEach(async () => {
    await UserCollectionTestHelper.emptyCollection();
  });

  afterAll(async () => {
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

      // Action
      await userRepository.addUser(payload);

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
      // Action
      await UserCollectionTestHelper.addUser({});

      // Action and assert
      await expect(userRepository.getUserByEmail('xyz@gmail.com')).rejects.toThrowError(InvariantError);
    });

    it('should not throw error when email exist', async () => {
      // Arrange
      const payload = {
        full_name: 'John Doe',
        phone_number_country_code: 64,
        phone_number: '81212341234',
        email: 'johndoe@gmail.com',
        password: 'SuperSecretPassword',
      };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const registeredUser = await userRepository.getUserByEmail(payload.email);

      // Assert
      expect(registeredUser).toHaveProperty('_id');
      expect(registeredUser.full_name).toEqual(payload.full_name);
      expect(registeredUser.phone_number_country_code).toEqual(payload.phone_number_country_code);
      expect(registeredUser.phone_number).toEqual(payload.phone_number);
      expect(registeredUser.email).toEqual(payload.email);
      expect(registeredUser.password).toEqual(payload.password);
    });
  });

  describe('getUserFullName function', () => {
    it('should throw error when id not found', async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(userRepository.getUserFullName(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should return correct user full name when id exist', async () => {
      // Arrange
      const payload = { full_name: 'John Doe', email: 'johndoe@gmail.com' };

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
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(userRepository.getUserPhoneNumber(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should return correct user`s phone number when id exist', async () => {
      // Arrange
      const payload = { phone_number: '81212341234', email: 'johndoe@gmail.com' };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      const id = String(user._id);

      // Assert
      const phone_number = await userRepository.getUserPhoneNumber(id);
      expect(phone_number).toEqual(payload.phone_number);
    });
  });

  describe('getUserPhoneNumberCountryCode function', () => {
    it('should throw error when id not found', async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(userRepository.getUserPhoneNumberCountryCode(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should return correct user`s phone number country code when id exist', async () => {
      // Arrange
      const payload = { phone_number_country_code: 64, email: 'johndoe@gmail.com' };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      const id = String(user._id);

      // Assert
      const phone_number_country_code = await userRepository.getUserPhoneNumberCountryCode(id);
      expect(phone_number_country_code).toEqual(payload.phone_number_country_code);
    });
  });

  describe('validateIdExist function', () => {
    it('should throw error when id does not exist', async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId();

      // Action and Assert
      await expect(userRepository.validateIdExist(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when id exist', async () => {
      // Arrange
      const payload = { email: 'johndoe@gmaili.com' };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });
      const user = await UserCollectionTestHelper.getUserByEmail(payload.email);
      const id = String(user._id);

      // Assert
      expect(async () => userRepository.validateIdExist(id)).not.toThrowError();
    });
  });

  describe('validateEmailExist function', () => {
    it('should throw error when email does not exist', async () => {
      // Arrange
      const email1 = 'johndoe@gmail.com';
      const email2 = 'autover@gmail.com';

      // Action and assert
      await UserCollectionTestHelper.addUser({ email: email1 });
      await expect(userRepository
        .validateEmailExist(email2)).rejects.toThrowError(InvariantError);
    });

    it('should not throw error when email exist', async () => {
      // Arrange
      const email = 'johndoe@gmail.com';

      // Action and assert
      await UserCollectionTestHelper.addUser({ email });
      expect(async () => userRepository
        .validateEmailExist(email)).not.toThrowError(InvariantError);
    });
  });

  describe('validateEmailDoesNotExist', () => {
    it('should throw error when email exist', async () => {
      // Arrange
      const payload = { email: 'johndoe@gmail.com' };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });

      // Assert
      await expect(userRepository.validateEmailDoesNotExist(payload.email))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when email does not exist', async () => {
      // Arrange
      const email = 'xxx@gmail.com';

      // Action and Assert
      expect(async () => userRepository
        .validateEmailDoesNotExist(email)).not.toThrowError(InvariantError);
    });
  });

  describe('validatePhoneNumberDoesNotExist', () => {
    it('should throw error when phone number exist', async () => {
      // Arrange
      const payload = { email: 'johndoe@gmail.com', phone_number: '81212341234' };

      // Action
      await UserCollectionTestHelper.addUser({ ...payload });

      // Assert
      await expect(userRepository.validatePhoneNumberDoesNotExist(payload.phone_number))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when phone number does not exist', async () => {
      // Arrange
      const phone_number = '81212345678';

      // Action and Assert
      expect(async () => userRepository
        .validatePhoneNumberDoesNotExist(phone_number)).not.toThrowError(InvariantError);
    });
  });
});
