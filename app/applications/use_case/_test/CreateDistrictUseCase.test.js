const CreateDistrictUseCase = require('../CreateDistrictUseCase');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');

describe('A Create District use case', () => {
  it('should orchestrating create district use case correctly', async () => {
    // Arrange
    const createDistrictPayload = { name: 'West Bandung' };

    const mockDistrictRepository = new DistrictRepository();

    mockDistrictRepository.validateNameDoesNotExist = jest.fn()
      .mockImplementation(async () => Promise.resolve());
    mockDistrictRepository.addDistrict = jest.fn()
      .mockImplementation(async () => Promise.resolve());

    const createDistrictUseCase = new CreateDistrictUseCase({
      districtRepository: mockDistrictRepository,
    });

    // Action
    await createDistrictUseCase.execute(createDistrictPayload);

    // Assert
    expect(mockDistrictRepository.validateNameDoesNotExist)
      .toBeCalledWith(createDistrictPayload.name);
    expect(mockDistrictRepository.addDistrict)
      .toBeCalledWith(createDistrictPayload.name);
  });
});
