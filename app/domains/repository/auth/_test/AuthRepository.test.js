const AuthRepository = require('../AuthRepository');

describe('An Auth Repository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const authRepository = new AuthRepository();

    // Action and Assert
    await expect(() => authRepository.addAuth({})).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => authRepository.validateRefreshTokenExist('')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
