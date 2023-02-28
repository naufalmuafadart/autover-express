const mongoose = require('mongoose');
const UpdateHostUseCase = require('../UpdateHostUseCase');
const HostRepository = require('../../../domains/repository/host/HostRepository');
const DistrictRepository = require('../../../domains/repository/district/DistrictRepository');
const MongooseValidator = require('../../validator/MongooseValidator');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const JWTPayload = require('../../../domains/repository/jwt/entities/JWTPayload');

describe('An Update Host use case', () => {
  it('should orchestrating update host use case correctly', async () => {
    // Arrange
    const districtId = String(new mongoose.Types.ObjectId());
    const userId = String(new mongoose.Types.ObjectId());
    const accessToken = 'ey.payload.signature';
    const authorizationHeader = `Bearer ${accessToken}`;
    const fullName = 'Autover';
    const phoneNumber = '81212341234';

    const updateHostPayload = {
      full_name: fullName,
      district_id: districtId,
      phone_number: phoneNumber,
    };

    const jwtPayloadPayload = {
      id: userId,
      iat: 0,
      exp: 0,
    };

    const mockHostRepository = new HostRepository();
    const mockDistrictRepository = new DistrictRepository();
    const mockMongooseValidator = new MongooseValidator();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationTokenManager.getTokenFromAuthorizationHeader = jest.fn()
      .mockImplementation(() => accessToken);
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => new JWTPayload(jwtPayloadPayload));
    mockMongooseValidator.validateId = jest.fn()
      .mockImplementation(() => {});
    mockDistrictRepository.validateIdExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockHostRepository.validateUserIsAHost = jest.fn().mockImplementation(() => Promise.resolve(''));
    mockHostRepository.updateHost = jest.fn()
      .mockImplementation(() => Promise.resolve(''));

    const updateHostUseCase = new UpdateHostUseCase({
      hostRepository: mockHostRepository,
      districtRepository: mockDistrictRepository,
      mongooseValidator: mockMongooseValidator,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    await updateHostUseCase.execute(updateHostPayload, authorizationHeader);

    // Assert
    expect(mockAuthenticationTokenManager.getTokenFromAuthorizationHeader)
      .toBeCalledWith(authorizationHeader);
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(accessToken);
    expect(mockMongooseValidator.validateId).toBeCalledTimes(2);
    expect(mockMongooseValidator.validateId).toBeCalledWith(districtId);
    expect(mockMongooseValidator.validateId).toBeCalledWith(userId);
    expect(mockDistrictRepository.validateIdExist).toBeCalledWith(districtId);
    expect(mockHostRepository.validateUserIsAHost).toBeCalledWith(userId);
    expect(mockHostRepository.updateHost).toBeCalledWith(userId, {
      full_name: fullName,
      district_id: districtId,
      phone_number: phoneNumber,
    });
  });
});
