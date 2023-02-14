const ReadCheckIsHostUseCase = require('../ReadCheckIsHostUseCase');

const hostRepository = {
  checkIsUserAHost() {},
};

const mongooseValidator = {
  validateId() {
    throw new Error('');
  },
};

const authenticationTokenManager = {
  getTokenFromAuthorizationHeader() {},
  verifyAccessToken() {},
};

describe('A ReadCheckIsHost use case', () => {
  it('should orchestrating ReadCheckIsHost correctly', async () => {
    const headerValue = '1234header';
    const token = '1234token';
    const id = '1234id';

    const checkIsUserAHostSpy = jest.spyOn(hostRepository, 'checkIsUserAHost').mockReturnValue(true);
    const validateIdSpy = jest.spyOn(mongooseValidator, 'validateId').mockImplementation();
    const getTokenFromAuthorizationHeaderSpy = jest.spyOn(authenticationTokenManager, 'getTokenFromAuthorizationHeader').mockReturnValue(token);
    const verifyAccessTokenSpy = jest.spyOn(authenticationTokenManager, 'verifyAccessToken').mockReturnValue({ id });

    const readCheckIsHostUseCase = new ReadCheckIsHostUseCase({
      hostRepository,
      mongooseValidator,
      authenticationTokenManager,
    });

    expect(async () => readCheckIsHostUseCase.execute(headerValue)).not.toThrowError();
    expect(getTokenFromAuthorizationHeaderSpy).toHaveBeenCalled();
    expect(getTokenFromAuthorizationHeaderSpy).toHaveBeenCalledWith(headerValue);

    expect(verifyAccessTokenSpy).toHaveBeenCalled();
    expect(verifyAccessTokenSpy).toHaveBeenCalledWith(token);

    expect(validateIdSpy).toHaveBeenCalled();
    expect(validateIdSpy).toHaveBeenCalledWith(id);

    expect(checkIsUserAHostSpy).toHaveBeenCalled();
    expect(checkIsUserAHostSpy).toHaveBeenCalledWith(id);
  });
});
