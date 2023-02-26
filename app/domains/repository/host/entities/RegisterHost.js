class RegisterHost {
  constructor(payload) {
    this._verifyPayload(payload);

    this.district_id = payload.district_id;
  }

  _verifyPayload({ district_id }) {
    if (district_id === undefined || typeof district_id === 'undefined' || district_id === null) {
      throw new Error('REGISTER_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
    }

    if (typeof district_id !== 'string') {
      throw new Error('REGISTER_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = RegisterHost;
