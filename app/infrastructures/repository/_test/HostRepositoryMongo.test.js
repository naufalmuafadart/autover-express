require('dotenv').config();
const mongoose = require('mongoose');
const HostRepositoryMongo = require('../HostRepositoryMongo');
const HostCollectionTestHelper = require('../../../../test/HostCollectionTestHelper');
const Host = require('../../../domains/mongoose_model/Host');
const InvariantError = require('../../../commons/exceptions/InvariantError');

describe('A host repository mongo', () => {
  const hostRepositoryMongo = new HostRepositoryMongo(Host);
  const photo_profile_url = 'https://firebasestorage.googleapis.com/v0/b/autover-87dfd.appspot.com/o/ic_user.png?alt=media&token=76d0aeb0-ac9f-4ed3-b2a9-378b97bd1acb';

  beforeAll(async () => {
    mongoose.connect(String(process.env.MONGO_URL));
  });

  afterEach(async () => {
    await HostCollectionTestHelper.emptyCollection();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe('an addHost function', () => {
    it('should add correct host to database', async () => {
      // Arrange
      const payload = {
        user_id: String(new mongoose.Types.ObjectId()),
        full_name: 'John Doe',
        district_id: String(new mongoose.Types.ObjectId()),
        phone_number_country_code: 12,
        phone_number: '81212341234',
        photo_profile_url,
      };

      // Action
      await hostRepositoryMongo.addHost(payload);

      // Assert
      const host = await HostCollectionTestHelper.getHostByUserId(payload.user_id);
      expect(typeof host).toBe('object');
      expect(host.full_name).toEqual(payload.full_name);
      expect(String(host.district_id)).toEqual(payload.district_id);
      expect(host.phone_number_country_code).toEqual(payload.phone_number_country_code);
      expect(host.phone_number).toEqual(payload.phone_number);
      expect(host.photo_profile_url).toEqual(payload.photo_profile_url);
    });
  });

  describe('an updateHost function', () => {
    it('should update host data on database', async () => {
      // Arrange
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      const editPayload = {
        full_name: 'Autover',
        district_id: String(new mongoose.Types.ObjectId()),
        phone_number: '81209876543',
      };
      await HostCollectionTestHelper.addHost({
        ...postPayload,
      });

      // Action
      await hostRepositoryMongo.updateHost(postPayload.user_id, editPayload);

      // Assert
      const host = await HostCollectionTestHelper.getHostByUserId(postPayload.user_id);
      expect(host.full_name).toEqual(editPayload.full_name);
      expect(String(host.district_id)).toEqual(editPayload.district_id);
      expect(host.phone_number).toEqual(editPayload.phone_number);
    });
  });

  describe('a checkIsUserAHost function', () => {
    it('should return false if user is not a host', async () => {
      // Arrange
      const fakeId = String(new mongoose.Types.ObjectId());
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action
      const isUserAHost = await hostRepositoryMongo.checkIsUserAHost(fakeId);

      // Assert
      expect(isUserAHost).toEqual(false);
    });

    it('should return true if user is a host', async () => {
      // Arrange
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action
      const isUserAHost = await hostRepositoryMongo.checkIsUserAHost(postPayload.user_id);

      // Assert
      expect(isUserAHost).toEqual(true);
    });
  });

  describe('a validateUserIsNotAHost function', () => {
    it('should throw error when user is a host', async () => {
      // Arrange
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action and Assert
      await expect(hostRepositoryMongo.validateUserIsNotAHost(postPayload.user_id))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when user is not a host', async () => {
      // Arrange
      const fakeId = String(new mongoose.Types.ObjectId());
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action and Assert
      expect(async () => hostRepositoryMongo.validateUserIsNotAHost(fakeId))
        .not.toThrowError();
    });
  });

  describe('a validateUserIsAHost function', () => {
    it('should throw error when user is not a host', async () => {
      // Arrange
      const fakeId = String(new mongoose.Types.ObjectId());
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action and Assert
      await expect(hostRepositoryMongo.validateUserIsAHost(fakeId))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when user is a host', async () => {
      // Arrange
      const postPayload = {
        user_id: String(new mongoose.Types.ObjectId()),
        district_id: String(new mongoose.Types.ObjectId()),
      };
      await HostCollectionTestHelper.addHost({ ...postPayload });

      // Action and Assert
      expect(async () => hostRepositoryMongo.validateUserIsAHost(postPayload.user_id))
        .not.toThrowError(InvariantError);
    });
  });
});
