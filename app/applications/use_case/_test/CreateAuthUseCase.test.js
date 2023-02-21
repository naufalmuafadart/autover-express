const mongoose = require('mongoose');
const CreateAuthUseCase = require('../CreateAuthUseCase');
const AuthRepository = require('../../../domains/repository/auth/AuthRepository');
const UserRepository = require('../../../domains/repository/user/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('A Create Auth use case', () => {
  it('should orchestrating create auth correctly', async () => {
    // Arrange
    const email = 'johndoe@gmail.com';
    const password = 'SuperSecretPassword';

    const hashedPassword = 'xxxYYYxxxYYY123456';

    const registerAuthPayload = { email, password };
    const registeredUserPayload = {
      _id: new mongoose.Types.ObjectId(),
      full_name: 'John Doe',
      phone_number_country_code: 64,
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: hashedPassword,
    };
    const fakeAccessToken = 'ey.at.sig';
    const fakeRefreshToken = 'ey.rt.sig';
    const tokenPayload = { id: registeredUserPayload._id };

    const mockAuthRepository = new AuthRepository();
    const mockUserRepository = new UserRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    mockAuthRepository.addAuth = jest.fn().mockImplementation(() => Promise.resolve({}));
    mockUserRepository.validateEmailExist = jest.fn().mockImplementation(() => Promise.resolve({}));
    mockUserRepository.getUserByEmail = jest.fn()
      .mockImplementation(() => Promise.resolve(registeredUserPayload));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(fakeAccessToken));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(fakeRefreshToken));
    mockPasswordHash.validatePassword = jest.fn().mockImplementation(() => {});

    const createAuthUseCase = new CreateAuthUseCase({
      userRepository: mockUserRepository,
      authRepository: mockAuthRepository,
      passwordHash: mockPasswordHash,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const { accessToken, refreshToken } = await createAuthUseCase.execute(registerAuthPayload);

    // Assert
    expect(mockUserRepository.validateEmailExist).toBeCalledWith(email);
    expect(mockUserRepository.getUserByEmail).toBeCalledWith(email);
    expect(mockPasswordHash.validatePassword).toBeCalledWith(password, hashedPassword);
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith(tokenPayload);
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith(tokenPayload);
    expect(mockAuthRepository.addAuth).toBeCalledWith({ refresh_token: fakeRefreshToken });
    expect(accessToken).toEqual(fakeAccessToken);
    expect(refreshToken).toEqual(fakeRefreshToken);
  });
});
