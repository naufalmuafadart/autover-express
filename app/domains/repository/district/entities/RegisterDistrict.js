class RegisterDistrict {
  constructor(payload) {
    this._verifyPayload(payload);

    this.name = payload.name;
  }

  _verifyPayload({ name }) {
    if (typeof name === 'undefined' || name === null) {
      throw new Error('REGISTER_DISTRICT_ENTITY.NAME_NOT_FOUND');
    }

    if (typeof name !== 'string') {
      throw new Error('REGISTER_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = RegisterDistrict;
