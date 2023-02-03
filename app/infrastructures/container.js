const { createContainer } = require('instances-container');

// library
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// repository
const AuthRepository = require('../domains/repository/auth/AuthRepository');
const HostRepository = require('../domains/repository/host/HostRepository');
const UserRepository = require('../domains/repository/user/UserRepository');
const DistrictRepository = require('../domains/repository/district/DistrictRepository');

// service
const PasswordHash = require('../applications/security/PasswordHash');
const AuthenticationTokenManager = require('../applications/security/AuthenticationTokenManager');

// repository infrastructure
const AuthRepositoryMongo = require('./repository/AuthRepositoryMongo');
const HostRepositoryMongo = require('./repository/HostRepositoryMongo');
const UserRepositoryMongo = require('./repository/UserRepositoryMongo');
const DistrictRepositoryMongo = require('./repository/DistrictRepositoryMongo');

// service infrastructure
const BcryptHash = require('./security/BcryptHash');
const JWTTokenManager = require('./security/JWTTokenManager');

// Mongoose model
const Auth = require('../domains/mongoose_model/Auth');
const Host = require('../domains/mongoose_model/Host');
const User = require('../domains/mongoose_model/User');
const District = require('../domains/mongoose_model/District');

// use case
const CreateDistrictUseCase = require('../applications/use_case/CreateDistrictUseCase');
const CreateHostUseCase = require('../applications/use_case/CreateHostUseCase');
const UpdateDistrictUseCase = require('../applications/use_case/UpdateDistrictUseCase');
const ReadDistrictsUseCase = require('../applications/use_case/ReadDistrictsUseCase');
const CreateAuthUseCase = require('../applications/use_case/CreateAuthUseCase');
const CreateUserUseCase = require('../applications/use_case/CreateUserUseCase');
const ViewDistrictUseCase = require('../applications/use_case/ViewDistrictUseCase');
const ViewEditDistrictUseCase = require('../applications/use_case/ViewEditDistrictUseCase');
const ReadCheckIsHostUseCase = require('../applications/use_case/ReadCheckIsHostUseCase');

// validator
const AuthValidator = require('../applications/validator/AuthValidator');
const HostValidator = require('../applications/validator/HostValidator');
const DistrictValidator = require('../applications/validator/DistrictValidator');
const UserValidator = require('../applications/validator/UserValidator');
const MongooseValidator = require('../applications/validator/MongooseValidator');

// validator infrastructure
const AuthValidatorJoi = require('./validator/auth/AuthValidatorJoi');
const HostValidatorJoi = require('./validator/host/HostValidatorJoi');
const DistrictValidatorJoi = require('./validator/district/DistrictValidatorJoi');
const UserValidatorJoi = require('./validator/user/UserValidatorJoi');
const MongooseValidatorMongoose = require('./validator/mongoose/MongooseValidatorMongoose');

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
  {
    key: DistrictRepository.name,
    Class: DistrictRepositoryMongo,
    parameter: {
      dependencies: [{
        concrete: District,
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
  {
    key: HostValidator.name,
    Class: HostValidatorJoi,
  },
  {
    key: DistrictValidator.name,
    Class: DistrictValidatorJoi,
  },
  {
    key: UserValidator.name,
    Class: UserValidatorJoi,
  },
  {
    key: MongooseValidator.name,
    Class: MongooseValidatorMongoose,
  },
]);

// registering use case
container.register([
  {
    key: CreateDistrictUseCase.name,
    Class: CreateDistrictUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
        {
          name: 'districtValidator',
          internal: DistrictValidator.name,
        },
      ],
    },
  },
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
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
        {
          name: 'mongooseValidator',
          internal: MongooseValidator.name,
        },
        {
          name: 'hostValidator',
          internal: HostValidator.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: UpdateDistrictUseCase.name,
    Class: UpdateDistrictUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
        {
          name: 'districtValidator',
          internal: DistrictValidator.name,
        },
      ],
    },
  },
  {
    key: ReadCheckIsHostUseCase.name,
    Class: ReadCheckIsHostUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'hostRepository',
          internal: HostRepository.name,
        },
        {
          name: 'mongooseValidator',
          internal: MongooseValidator.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: ReadDistrictsUseCase.name,
    Class: ReadDistrictsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
      ],
    },
  },
  {
    key: CreateAuthUseCase.name,
    Class: CreateAuthUseCase,
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
    key: CreateUserUseCase.name,
    Class: CreateUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'userValidator',
          internal: UserValidator.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: ViewDistrictUseCase.name,
    Class: ViewDistrictUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
      ],
    },
  },
  {
    key: ViewEditDistrictUseCase.name,
    Class: ViewEditDistrictUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'districtRepository',
          internal: DistrictRepository.name,
        },
        {
          name: 'districtValidator',
          internal: DistrictValidator.name,
        },
        {
          name: 'mongooseValidator',
          internal: MongooseValidator.name,
        },
      ],
    },
  },
]);

module.exports = container;
