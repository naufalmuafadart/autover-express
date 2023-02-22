const DistrictRepository = require('../DistrictRepository');

describe('An District Repository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const districtRepository = new DistrictRepository();

    // Action and Assert
    await expect(() => districtRepository.addDistrict('')).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => districtRepository.validateIdExist('')).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => districtRepository.getDistricts()).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => districtRepository.getDistrict('')).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => districtRepository.editDistrict('', '')).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => districtRepository.validateNameDoesNotExist('')).rejects.toThrowError('DISTRICT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
