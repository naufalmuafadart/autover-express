const mongoose = require('mongoose');
const UpdateAuthUseCase = require('../UpdateAuthUseCase');
const AuthRepository = require('../../../domains/repository/auth/AuthRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const JWTPayload = require('../../../domains/repository/jwt/entities/JWTPayload');

describe('An Update Auth use case', () => {
  it('should orchestrating update auth use case correctly', async () => {
    // Arrange
    const jwtPayloadPayload = {
      id: String(new mongoose.Types.ObjectId()),
      iat: 0,
      exp: 0,
    };
    const putAuthPayload = {
      refresh_token: 'ey.payload.signature',
    };
    const expectedAccessToken = 'ey.{}.signature';

    const mockAuthRepository = new AuthRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => new JWTPayload(jwtPayloadPayload));
    mockAuthRepository.validateRefreshTokenExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAccessToken));

    const updateAuthUseCase = new UpdateAuthUseCase({
      authRepository: mockAuthRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessToken = await updateAuthUseCase.execute(putAuthPayload);

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledTimes(2);
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(putAuthPayload.refresh_token);
    expect(mockAuthRepository.validateRefreshTokenExist)
      .toBeCalledWith(putAuthPayload.refresh_token);
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({
        id: jwtPayloadPayload.id,
      });
    expect(accessToken).toEqual(expectedAccessToken);
  });
});
