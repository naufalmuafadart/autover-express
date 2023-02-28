const mongoose = require('mongoose');
const ViewEditDistrictUseCase = require('../ViewEditDistrictUseCase');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');
const MongooseValidator = require('../../validator/MongooseValidator');

describe('A View Edit use case', () => {
  it('should throw error when params did not contain required field', async () => {
    // Arrange
    const params1 = {};
    const params2 = { id: undefined };
    const params3 = { id: null };
    const viewEditDistrictUseCase = new ViewEditDistrictUseCase({});

    // Action and Assert
    await expect(viewEditDistrictUseCase.execute(params1)).rejects.toThrowError('VIEW_EDIT_DISTRICT_USE_CASE.ID_NOT_FOUND');
    await expect(viewEditDistrictUseCase.execute(params2)).rejects.toThrowError('VIEW_EDIT_DISTRICT_USE_CASE.ID_NOT_FOUND');
    await expect(viewEditDistrictUseCase.execute(params3)).rejects.toThrowError('VIEW_EDIT_DISTRICT_USE_CASE.ID_NOT_FOUND');
  });

  it('should orchestrating view edit use case correctly', async () => {
    // Arrange
    const params = {
      id: String(new mongoose.Types.ObjectId()),
    };
    const expectedDistrict = {
      _id: String(new mongoose.Types.ObjectId()),
      name: 'Bandung',
    };

    const mockDistrictRepository = new DistrictRepository();
    const mockMongooseValidator = new MongooseValidator();

    mockMongooseValidator.validateId = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockDistrictRepository.validateIdExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockDistrictRepository.getDistrict = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDistrict));

    const viewEditDistrictUseCase = new ViewEditDistrictUseCase({
      districtRepository: mockDistrictRepository,
      mongooseValidator: mockMongooseValidator,
    });

    // Action
    const district = await viewEditDistrictUseCase.execute(params);

    // Assert
    expect(mockMongooseValidator.validateId).toBeCalledWith(params.id);
    expect(mockDistrictRepository.validateIdExist).toBeCalledWith(params.id);
    expect(mockDistrictRepository.getDistrict).toBeCalledWith(params.id);
    expect(district).toEqual(expectedDistrict);
  });
});
