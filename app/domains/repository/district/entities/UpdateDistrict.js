class UpdateDistrict {
  constructor(params, payload) {
    this._verifyPayload({ ...params, ...payload });

    this.id = params.id;
    this.name = payload.name;
  }

  _verifyPayload({ id, name }) {
    if (typeof id === 'undefined' || id === undefined || id === null) {
      throw new Error('UPDATE_DISTRICT_ENTITY.ID_NOT_FOUND');
    }

    if (typeof name === 'undefined' || name === undefined || name === null) {
      throw new Error('UPDATE_DISTRICT_ENTITY.NAME_NOT_FOUND');
    }

    if (typeof id !== 'string') {
      throw new Error('UPDATE_DISTRICT_ENTITY.ID_SHOULD_BE_A_STRING');
    }

    if (typeof name !== 'string') {
      throw new Error('UPDATE_DISTRICT_ENTITY.NAME_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = UpdateDistrict;
