const { createContainer } = require('instances-container');

// repository
const AuthRepository = require('../domains/auth/AuthRepository');
const HostRepository = require('../domains/host/HostRepository');
const UserRepository = require('../domains/user/UserRepository');

// repository infrastructure
const AuthRepositoryMongo = require('./repository/AuthRepositoryMongo');
const HostRepositoryMongo = require('./repository/HostRepositoryMongo');
const UserRepositoryMongo = require('./repository/UserRepositoryMongo');

// Mongoose mongoose_model
const Auth = require('../domains/mongoose_model/Auth');
const Host = require('../domains/mongoose_model/Host');
const User = require('../domains/mongoose_model/User');

const container = createContainer();

// registering services and repository
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

module.exports = container;
