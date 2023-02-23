const PasswordHash = require('../PasswordHash');

describe('A Password Hash interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const passwordHash = new PasswordHash();

    await expect(passwordHash.hashString('')).rejects.toThrowError('PASSWORD_HASH.PASSWORD_NOT_IMPLEMENTED');
    expect(() => passwordHash.validatePassword('', '')).toThrowError('PASSWORD_HASH.PASSWORD_NOT_IMPLEMENTED');
  });
});
