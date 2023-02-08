const ClientError = require('../ClientError');
const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should be instance of Not FoundError, ClientError, and Error', () => {
    const notFoundError = new NotFoundError('Not found');

    expect(notFoundError).toBeInstanceOf(Error);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(NotFoundError);
  });

  it('should have 404 status code', () => {
    const notFoundError = new NotFoundError('Not Found');
    expect(notFoundError.statusCode).toEqual(404);
  });

  it('The message must be same as predefined message', () => {
    const message = 'Not Found';
    const notFoundError = new NotFoundError(message);
    expect(notFoundError.message).toEqual(message);
  });

  it('name should correct', () => {
    const notFoundError = new NotFoundError('Not Found');
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
