const HostRepository = require('../../domains/host/HostRepository');
const InvariantError = require('../../commons/exceptions/InvariantError');

class HostRepositoryMongo extends HostRepository {
  constructor(Host) {
    super();
    this._Host = Host;
  }

  async addHost(payload) {
    const host = await new this._Host(payload);
    await host.save();
  }

  async checkIsUserAHost(id) {
    try {
      const hostCount = await this._Host.find({ user_id: id }).count();
      return Promise.resolve(hostCount === 1);
    } catch (e) {
      throw e;
    }
  }

  async validateUserIsNotAHost(id) {
    const hostCount = await this._Host.find({ user_id: id }).count();
    if (hostCount === 1) throw new InvariantError('User already be a host');
  }
}

module.exports = HostRepositoryMongo;
