class UpdateAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    this.refresh_token = payload.refresh_token;
  }

  _verifyPayload({ refresh_token }) {
    if (typeof refresh_token === 'undefined' || refresh_token === undefined || refresh_token === null) {
      throw new Error('UPDATE_AUTH_ENTITY.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refresh_token !== 'string') {
      throw new Error('UPDATE_AUTH_ENTITY.REFRESH_TOKEN_SHOULD_BE_A_STRING');
    }
  }
}

module.exports = UpdateAuth;
