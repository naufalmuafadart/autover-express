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

// Mongoose mongoose_model
const Auth = require('../domains/mongoose_model/Auth');
const Host = require('../domains/mongoose_model/Host');
const User = require('../domains/mongoose_model/User');

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

module.exports = container;
