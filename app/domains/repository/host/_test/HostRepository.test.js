const HostRepository = require('../HostRepository');

describe('A Host Repository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const hostRepository = new HostRepository();

    // Action and Assert
    await expect(() => hostRepository.addHost({})).rejects.toThrowError('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => hostRepository.updateHost('', {})).rejects.toThrowError('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => hostRepository.checkIsUserAHost('')).rejects.toThrowError('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => hostRepository.validateUserIsNotAHost('')).rejects.toThrowError('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => hostRepository.validateUserIsAHost('')).rejects.toThrowError('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
