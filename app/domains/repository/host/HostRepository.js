/* eslint-disable no-unused-vars */

class HostRepository {
  async addHost(payload) {
    throw Error('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateHost(user_id, payload) {
    throw Error('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkIsUserAHost(id) {
    throw Error('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateUserIsNotAHost(id) {
    throw Error('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateUserIsAHost(id) {
    throw Error('HOST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = HostRepository;
