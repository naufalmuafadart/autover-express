const { createContainer } = require('instances-container');

// library
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// repository
const AuthRepository = require('../domains/auth/AuthRepository');
const HostRepository = require('../domains/host/HostRepository');
const UserRepository = require('../domains/user/UserRepository');

// service
const PasswordHash = require('../applications/security/PasswordHash');
const AuthenticationTokenManager = require('../applications/security/AuthenticationTokenManager');

// repository infrastructure
const AuthRepositoryMongo = require('./repository/AuthRepositoryMongo');
const HostRepositoryMongo = require('./repository/HostRepositoryMongo');
const UserRepositoryMongo = require('./repository/UserRepositoryMongo');

// service infrastructure
const BcryptHash = require('./security/BcryptHash');
const JWTTokenManager = require('./security/JWTTokenManager');

// Mongoose model
const Auth = require('../domains/mongoose_model/Auth');
const Host = require('../domains/mongoose_model/Host');
const User = require('../domains/mongoose_model/User');

// use case
const CreateHostUseCase = require('../applications/use_case/CreateHostUseCase');
const SignInUseCase = require('../applications/use_case/SignInUseCase');
const SignUpUseCase = require('../applications/use_case/SignUpUseCase');

// validator
const AuthValidator = require('../applications/validator/AuthValidator');

// validator infrastructure
const AuthValidatorJoi = require('./validator/auth/AuthValidatorJoi');

const container = createContainer();

// registering repository
container.register([
  {
    key: AuthRepository.name,
    Class: AuthRepositoryMongo,
    parameter: {
      dependencies: [{
        concrete: Auth,
      }],
    },
  },
  {
    key: HostRepository.name,
    Class: HostRepositoryMongo,
    parameter: {
      dependencies: [{
        concrete: Host,
      }],
    },
  },
  {
    key: UserRepository.name,
    Class: UserRepositoryMongo,
    parameter: {
      dependencies: [{
        concrete: User,
      }],
    },
  },
]);

// registering service
container.register([
  {
    key: PasswordHash.name,
    Class: BcryptHash,
    parameter: {
      dependencies: [{
        concrete: bcrypt,
      }],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JWTTokenManager,
    parameter: {
      dependencies: [{
        concrete: JWT,
      }],
    },
  },
]);

// registering validator
container.register([
  {
    key: AuthValidator.name,
    Class: AuthValidatorJoi,
  },
]);

// registering use case
container.register([
  {
    key: CreateHostUseCase.name,
    Class: CreateHostUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'hostRepository',
          internal: HostRepository.name,
        },
      ],
    },
  },
  {
    key: SignInUseCase.name,
    Class: SignInUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authValidator',
          internal: AuthValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: SignUpUseCase.name,
    Class: SignUpUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authValidator',
          internal: AuthValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

module.exports = container;
