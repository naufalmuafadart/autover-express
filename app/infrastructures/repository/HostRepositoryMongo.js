const HostRepository = require('../../domains/host/HostRepository');

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
}

module.exports = HostRepositoryMongo;
