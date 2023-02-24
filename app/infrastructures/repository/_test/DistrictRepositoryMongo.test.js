require('dotenv').config();
const mongoose = require('mongoose');
const District = require('../../../domains/mongoose_model/District');
const DistrictRepositoryMongo = require('../DistrictRepositoryMongo');
const DistrictCollectionTestHelper = require('../../../../test/DistrictCollectionTestHelper');
const InvariantError = require('../../../commons/exceptions/InvariantError');

describe('A District Repository Mongo', () => {
  const districtRepository = new DistrictRepositoryMongo(District);

  beforeAll(async () => {
    mongoose.connect(String(process.env.MONGO_URL));
  });

  afterEach(async () => {
    await DistrictCollectionTestHelper.emptyCollection();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe('an addDistrict function', () => {
    it('should add district to database', async () => {
      // Arrange
      const name = 'Cibeunying';

      // Action
      await districtRepository.addDistrict(name);

      // Assert
      expect(async () => DistrictCollectionTestHelper.validateDistrictNameExist(name))
        .not.toThrowError();
    });
  });

  describe('a validateIdExist function', () => {
    it('should throw error when id does not exist', async () => {
      // Arrange
      const fakeId = String(new mongoose.Types.ObjectId());

      // Action
      await DistrictCollectionTestHelper.addDistrict({});

      // Assert
      await expect(districtRepository.validateIdExist(fakeId)).rejects.toThrowError(InvariantError);
    });

    it('should not throw error when id exist', async () => {
      // Arrange
      const payload = { name: 'BandungX' };

      // Action
      await DistrictCollectionTestHelper.addDistrict({ ...payload });
      const id = await DistrictCollectionTestHelper.getIdByName(payload.name);

      // Assert
      expect(async () => districtRepository.validateIdExist(id)).not.toThrowError();
    });
  });

  describe('a getDistricts function', () => {
    it('should return all districts correctly', async () => {
      // Arrange
      const payload1 = { name: 'Bandung1' };
      const payload2 = { name: 'Bandung2' };
      const payload3 = { name: 'Bandung3' };
      await DistrictCollectionTestHelper.addDistrict({ ...payload1 });
      await DistrictCollectionTestHelper.addDistrict({ ...payload2 });
      await DistrictCollectionTestHelper.addDistrict({ ...payload3 });
      const payloads = [payload1, payload2, payload3];

      // Action
      const districts = await districtRepository.getDistricts();

      // Assert
      expect(Array.isArray(districts)).toEqual(true);
      expect(districts).toHaveLength(3);
      for (let i = 0; i < districts.length; i++) {
        const district = districts[i];
        expect(typeof district).toBe('object');
        expect(district).toHaveProperty('_id');
        expect(district).toHaveProperty('name');
        expect(district.name).toEqual(payloads[i].name);
      }
    });
  });

  describe('a getDistrict function', () => {
    it('should throw error when id not exist', async () => {
      // Arrange
      const fakeId = new mongoose.Types.ObjectId();
      await DistrictCollectionTestHelper.addDistrict({});

      // Action and Assert
      await expect(districtRepository.getDistrict(fakeId)).rejects.toThrowError();
    });

    it('should return correct district when id exist', async () => {
      // Arrange
      const payload = { name: 'Bandung' };
      await DistrictCollectionTestHelper.addDistrict({ ...payload });
      const id = await DistrictCollectionTestHelper.getIdByName(payload.name);

      // Action
      const district = await districtRepository.getDistrict(id);

      // Assert
      expect(typeof district).toBe('object');
      expect(district).toHaveProperty('name');
      expect(district.name).toEqual(payload.name);
    });
  });

  describe('an editDistrict function', () => {
    it('should update district data on database', async () => {
      // Arrange
      const postPayload = { name: 'Bandung' };
      const putName = 'Jakarta';
      await DistrictCollectionTestHelper.addDistrict({ ...postPayload });
      const id = await DistrictCollectionTestHelper.getIdByName(postPayload.name);

      // Action
      await districtRepository.editDistrict(id, putName);
      const updatedName = await DistrictCollectionTestHelper.getNameById(id);

      // Assert
      expect(updatedName).toEqual(putName);
    });
  });

  describe('a validateNameDoesNotExist function', () => {
    it('should throw error when name exist', async () => {
      // Arrange
      const payload = { name: 'Bandung' };
      await DistrictCollectionTestHelper.addDistrict({ ...payload });

      // Action
      await expect(districtRepository.validateNameDoesNotExist(payload.name))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw error when name exist', async () => {
      // Arrange
      await DistrictCollectionTestHelper.addDistrict({});

      // Action
      expect(async () => districtRepository.validateNameDoesNotExist('Bojongsoang'))
        .not.toThrowError(InvariantError);
    });
  });
});
