const ReadDistrictsUseCase = require('../ReadDistrictsUseCase');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');

describe('A Read Districts use case', () => {
  it('should orchestrating Read District use case correctly', async () => {
    // Arrange
    const mockDistrictRepository = new DistrictRepository();
    mockDistrictRepository.getDistricts = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    const readDistrictsUseCase = new ReadDistrictsUseCase({
      districtRepository: mockDistrictRepository,
    });

    // Action
    await readDistrictsUseCase.execute();

    // Assert
    expect(mockDistrictRepository.getDistricts).toHaveBeenCalled();
  });
});
