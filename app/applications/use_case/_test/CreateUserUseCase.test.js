const CreateUserUseCase = require('../CreateUserUseCase');
const UserRepository = require('../../../domains/repository/user/UserRepository');
const PasswordHash = require('../../security/PasswordHash');

describe('A Create User use case', () => {
  it('should orchestrating create user use case correctly', async () => {
    // Arrange
    const useCasePayload = {
      full_name: 'John Doe',
      phone_number: '81212341234',
      email: 'johndoe@gmail.com',
      password: 'SuperSecretPassword',
    };
    const hashedPassword = 'HashedPassword';

    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.validateEmailDoesNotExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockUserRepository.validatePhoneNumberDoesNotExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockPasswordHash.hashString = jest.fn()
      .mockImplementation(() => Promise.resolve(hashedPassword));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(''));

    const createUserUseCase = new CreateUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    await createUserUseCase.execute(useCasePayload);

    // Assert
    expect(mockUserRepository.validateEmailDoesNotExist).toBeCalledWith(useCasePayload.email);
    expect(mockUserRepository.validatePhoneNumberDoesNotExist)
      .toBeCalledWith(useCasePayload.phone_number);
    expect(mockPasswordHash.hashString).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith({
      ...useCasePayload,
      password: hashedPassword,
    });
  });
});
