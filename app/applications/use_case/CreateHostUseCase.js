class CreateHostUseCase {
  constructor({
    hostRepository,
  }) {
    this._hostRepository = hostRepository;
  }

  async execute(payload) {
    try {
      const { user_id, district } = payload;
      await this._hostRepository.addHost({ user_id, district });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CreateHostUseCase;
