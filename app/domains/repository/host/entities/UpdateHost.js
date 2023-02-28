class UpdateHost {
  constructor(payload) {
    this._verifyPayload(payload);

    this.full_name = payload.full_name;
    this.district_id = payload.district_id;
    this.phone_number = payload.phone_number;
  }

  _verifyPayload({ full_name, district_id, phone_number }) {
    if (typeof full_name === 'undefined' || full_name === null) {
      throw new Error('UPDATE_HOST_ENTITY.FULL_NAME_NOT_FOUND');
    }

    if (typeof district_id === 'undefined' || district_id === null) {
      throw new Error('UPDATE_HOST_ENTITY.DISTRICT_ID_NOT_FOUND');
    }

    if (typeof phone_number === 'undefined' || phone_number === null) {
      throw new Error('UPDATE_HOST_ENTITY.PHONE_NUMBER_NOT_FOUND');
    }

    if (typeof full_name !== 'string') {
      throw new Error('UPDATE_HOST_ENTITY.FULL_NAME_SHOULD_BE_A_STRING');
    }

    if (typeof district_id !== 'string') {
      throw new Error('UPDATE_HOST_ENTITY.DISTRICT_ID_SHOULD_BE_A_STRING');
    }

    if (typeof phone_number !== 'string') {
      throw new Error('UPDATE_HOST_ENTITY.PHONE_NUMBER_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = UpdateHost;
