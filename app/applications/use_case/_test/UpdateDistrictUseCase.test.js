const mongoose = require('mongoose');
const UpdateDistrictUseCase = require('../UpdateDistrictUseCase');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');

describe('An Update District use case', () => {
  it('should orchestrating Update District use case correctly', async () => {
    // Arrange
    const updateDistrictParams = {
      id: String(new mongoose.Types.ObjectId()),
    };
    const updateDistrictPayload = {
      name: 'Bandung',
    };

    const mockDistrictRepository = new DistrictRepository();
    mockDistrictRepository.validateIdExist = jest.fn().mockImplementation(() => Promise.resolve(''));
    mockDistrictRepository.validateNameDoesNotExist = jest.fn().mockImplementation(() => Promise.resolve(''));
    mockDistrictRepository.editDistrict = jest.fn().mockImplementation(() => Promise.resolve(''));

    const updateDistrictUseCase = new UpdateDistrictUseCase({
      districtRepository: mockDistrictRepository,
    });

    // Action
    await updateDistrictUseCase.execute(updateDistrictParams, updateDistrictPayload);

    // Assert
    expect(mockDistrictRepository.validateIdExist).toBeCalledWith(updateDistrictParams.id);
    expect(mockDistrictRepository.validateNameDoesNotExist)
      .toBeCalledWith(updateDistrictPayload.name);
    expect(mockDistrictRepository.editDistrict)
      .toBeCalledWith(updateDistrictParams.id, updateDistrictPayload.name);
  });
});
