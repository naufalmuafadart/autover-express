const ClientError = require('../ClientError');
const AuthorizationError = require('../AuthorizationError');

describe('Authorization Error', () => {
  it('should be instance of Error, ClientError, dan AuthorizationError', () => {
    const authorizationError = new AuthorizationError('Error');

    expect(authorizationError).toBeInstanceOf(Error);
    expect(authorizationError).toBeInstanceOf(ClientError);
    expect(authorizationError).toBeInstanceOf(AuthorizationError);
  });

  it('should have 401 status code', () => {
    const authorizationError = new AuthorizationError('Error');

    expect(authorizationError.statusCode).toEqual(401);
  });

  it('The message must be same as predefined message', () => {
    const message = 'The Authorization Error';
    const authorizationError = new AuthorizationError(message);
    expect(authorizationError.message).toEqual(message);
  });

  it('name should correct', () => {
    const authorizationError = new AuthorizationError('message');
    expect(authorizationError.name).toEqual('AuthorizationError');
  });
});
