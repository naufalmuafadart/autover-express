const ViewDistrictUseCase = require('../ViewDistrictUseCase');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');

describe('A ViewDistrict use case', () => {
  it('should orchestrating view district use case correctly', async () => {
    // Arrange
    const expectedDistricts = [];
    const mockDistrictRepository = new DistrictRepository();
    mockDistrictRepository.getDistricts = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDistricts));

    const viewDistrictUseCase = new ViewDistrictUseCase({
      districtRepository: mockDistrictRepository,
    });

    // Action
    const districts = await viewDistrictUseCase.execute();

    // Assert
    expect(mockDistrictRepository.getDistricts).toHaveBeenCalled();
    expect(districts).toEqual(expectedDistricts);
  });
});
