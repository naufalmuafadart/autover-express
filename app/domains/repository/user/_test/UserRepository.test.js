const UserRepository = require('../UserRepository');

describe('An User Repository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const userRepository = new UserRepository();

    // Action and Assert
    await expect(() => userRepository.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.getUserByEmail('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.getUserFullName('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.getUserPhoneNumber('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.getUserPhoneNumberCountryCode('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.validateIdExist('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.validateEmailExist('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.validateEmailDoesNotExist('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => userRepository.validatePhoneNumberDoesNotExist('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
