const ClientError = require('../ClientError');
const InvariantError = require('../InvariantError');

describe('InvariantError', () => {
  it('should be instance of InvariantError, ClientError, and Error', () => {
    const invariantError = new InvariantError('The error message');

    expect(invariantError).toBeInstanceOf(Error);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(InvariantError);
  });

  it('should have 400 status code', () => {
    const invariantError = new InvariantError('The error message');
    expect(invariantError.statusCode).toEqual(400);
  });

  it('The message must be same as predefined message', () => {
    const message = 'The error message';
    const invariantError = new InvariantError(message);
    expect(invariantError.message).toEqual(message);
  });

  it('name should correct', () => {
    const invariantError = new InvariantError('The error message');
    expect(invariantError.name).toEqual('InvariantError');
  });
});
