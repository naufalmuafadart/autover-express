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
}

module.exports = HostRepositoryMongo;
