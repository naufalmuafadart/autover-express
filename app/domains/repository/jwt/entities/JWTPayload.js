class JWTPayload {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.iat = payload.iat;
    this.exp = payload.exp;
  }

  _verifyPayload({ id, iat, exp }) {
    if (id === null || typeof id === 'undefined') {
      throw new Error('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_ID');
    }

    if (iat === null || typeof iat === 'undefined') {
      throw new Error('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_IAT');
    }

    if (exp === null || typeof exp === 'undefined') {
      throw new Error('JWT_PAYLOAD_ENTITY.NOT_CONTAIN_EXP');
    }

    if (typeof id !== 'string') {
      throw new Error('JWT_PAYLOAD_ENTITY.ID_SHOULD_BE_A_STRING');
    }

    if (typeof iat !== 'number') {
      throw new Error('JWT_PAYLOAD_ENTITY.IAT_SHOULD_BE_A_NUMBER');
    }

    if (typeof exp !== 'number') {
      throw new Error('JWT_PAYLOAD_ENTITY.EXP_SHOULD_BE_A_NUMBER');
    }
  }
}

module.exports = JWTPayload;
