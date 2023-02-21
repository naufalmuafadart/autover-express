const ReadCheckIsHostUseCase = require('../ReadCheckIsHostUseCase');
const HostRepository = require('../../../domains/repository/host/HostRepository');
const MongooseValidator = require('../../validator/MongooseValidator');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('A ReadCheckIsHost use case', () => {
  it('should orchestrating ReadCheckIsHost correctly', async () => {
    // Arrange
    const headerValue = '1234header';
    const token = '1234token';
    const id = '1234id';

    const mockHostRepository = new HostRepository();
    const mockMongooseValidator = new MongooseValidator();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockHostRepository.checkIsUserAHost = jest.fn().mockImplementation(() => Promise.resolve(true));
    mockMongooseValidator.validateId = jest.fn().mockImplementation(() => {});
    mockAuthenticationTokenManager.getTokenFromAuthorizationHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(token));
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn().mockImplementation(() => ({ id }));

    const readCheckIsHostUseCase = new ReadCheckIsHostUseCase({
      hostRepository: mockHostRepository,
      mongooseValidator: mockMongooseValidator,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const isUserAHost = await readCheckIsHostUseCase.execute(headerValue);

    // Assert
    expect(isUserAHost).toEqual(true);
    expect(mockAuthenticationTokenManager.getTokenFromAuthorizationHeader)
      .toBeCalledWith(headerValue);
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalled();
    expect(mockMongooseValidator.validateId).toBeCalledWith(id);
    expect(mockHostRepository.checkIsUserAHost).toBeCalledWith(id);
    expect(async () => readCheckIsHostUseCase.execute(headerValue)).not.toThrowError();
  });
});
