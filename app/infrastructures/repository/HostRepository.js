const Host = require('../../domains/model/Host');

class HostRepository {
  async addHost(payload) {
    const host = await new Host(payload);
    await host.save();
  }
}

module.exports = HostRepository;
