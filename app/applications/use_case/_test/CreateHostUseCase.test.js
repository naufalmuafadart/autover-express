const mongoose = require('mongoose');
const CreateHostUseCase = require('../CreateHostUseCase');
const HostRepository = require('../../../domains/repository/host/HostRepository');
const UserRepository = require('../../../domains/repository/user/UserRepository');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');
const MongooseValidator = require('../../validator/MongooseValidator');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const JWTPayload = require('../../../domains/repository/jwt/entities/JWTPayload');

describe('A Create Host use case', () => {
  it('should orchestrating create host use case correctly', async () => {
    // Arrange
    const userId = String(new mongoose.Types.ObjectId());
    const authorizationHeader = 'fakeAuthorizationHeader';
    const accessToken = 'fakeAccessToken';
    const districtId = String(new mongoose.Types.ObjectId());
    const full_name = 'John Doe';
    const phone_number = '81212341234';
    const phone_number_cc = 62;

    const createHostPayload = {
      district_id: districtId,
    };
    const jwtPayloadPayload = {
      id: userId,
      iat: 0,
      exp: 0,
    };

    const mockHostRepository = new HostRepository();
    const mockUserRepository = new UserRepository();
    const mockDistrictRepository = new DistrictRepository();
    const mockMongooseValidator = new MongooseValidator();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationTokenManager.getTokenFromAuthorizationHeader = jest.fn()
      .mockImplementation(() => accessToken);
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => new JWTPayload(jwtPayloadPayload));
    mockMongooseValidator.validateId = jest.fn()
      .mockImplementation(() => {});
    mockUserRepository.validateIdExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockHostRepository.validateUserIsNotAHost = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockDistrictRepository.validateIdExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockUserRepository.getUserFullName = jest.fn()
      .mockImplementation(() => Promise.resolve(full_name));
    mockUserRepository.getUserPhoneNumber = jest.fn()
      .mockImplementation(() => Promise.resolve(phone_number));
    mockUserRepository.getUserPhoneNumberCountryCode = jest.fn()
      .mockImplementation(() => Promise.resolve(phone_number_cc));
    mockHostRepository.addHost = jest.fn()
      .mockImplementation(() => Promise.resolve(''));

    const createHostUseCase = new CreateHostUseCase({
      hostRepository: mockHostRepository,
      userRepository: mockUserRepository,
      districtRepository: mockDistrictRepository,
      mongooseValidator: mockMongooseValidator,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    await createHostUseCase.execute(createHostPayload, authorizationHeader);

    // Assert
    expect(mockAuthenticationTokenManager.getTokenFromAuthorizationHeader)
      .toBeCalledWith(authorizationHeader);
    expect(mockAuthenticationTokenManager.verifyAccessToken)
      .toBeCalledWith(accessToken);
    expect(mockMongooseValidator.validateId).toBeCalledTimes(2);
    expect(mockMongooseValidator.validateId).toBeCalledWith(userId);
    expect(mockMongooseValidator.validateId).toBeCalledWith(districtId);

    expect(mockUserRepository.validateIdExist).toBeCalledWith(userId);
    expect(mockHostRepository.validateUserIsNotAHost).toBeCalledWith(userId);
    expect(mockDistrictRepository.validateIdExist).toBeCalledWith(districtId);

    expect(mockUserRepository.getUserFullName).toBeCalledWith(userId);
    expect(mockUserRepository.getUserPhoneNumber).toBeCalledWith(userId);
    expect(mockUserRepository.getUserPhoneNumberCountryCode).toBeCalledWith(userId);

    expect(mockHostRepository.addHost).toBeCalledWith({
      user_id: userId,
      full_name,
      district_id: districtId,
      phone_number,
      phone_number_country_code: phone_number_cc,
    });
  });
});
