const JWTPayload = require('../JWTPayload');

describe('JWT Payload entity', () => {
  it('should throw error when payload did not contain required entity', () => {
    const payload1 = {
      iat: 6846,
      exp: 5487,
    };

    const payload2 = {
      id: '35232fvt',
      exp: 5487,
    };

    const payload3 = {
      id: '35232fvt',
      iat: 6846,
    };

    expect(() => new JWTPayload(payload1)).toThrowError('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_ID');
    expect(() => new JWTPayload(payload2)).toThrowError('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_IAT');
    expect(() => new JWTPayload(payload3)).toThrowError('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_EXP');
  });

  it('should throw error when data type did not meet data type specification', () => {
    const payload1 = {
      id: {},
      iat: 6846,
      exp: 5487,
    };

    const payload2 = {
      id: '35232fvt',
      iat: true,
      exp: 5487,
    };

    const payload3 = {
      id: '35232fvt',
      iat: 6846,
      exp: [5487],
    };

    expect(() => new JWTPayload(payload1)).toThrowError('JWT_PAYLOAD_ENTITY.ID_SHOULD_BE_A_STRING');
    expect(() => new JWTPayload(payload2)).toThrowError('JWT_PAYLOAD_ENTITY.IAT_SHOULD_BE_A_NUMBER');
    expect(() => new JWTPayload(payload3)).toThrowError('JWT_PAYLOAD_ENTITY.EXP_SHOULD_BE_A_NUMBER');
  });

  it('should create jwt payload object correctly', () => {
    // Arrange
    const payload = {
      id: '35232fvt',
      iat: 6846,
      exp: 5487,
    };

    // Action
    const jwtPayload = new JWTPayload(payload);

    // Assert
    expect(jwtPayload.id).toEqual(payload.id);
    expect(jwtPayload.iat).toEqual(payload.iat);
    expect(jwtPayload.exp).toEqual(payload.exp);
  });
});
