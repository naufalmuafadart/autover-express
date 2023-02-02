const { createContainer } = require('instances-container');

// library
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

// repository
const AuthRepository = require('../domains/auth/AuthRepository');
const HostRepository = require('../domains/host/HostRepository');
const UserRepository = require('../domains/user/UserRepository');
const DistrictRepository = require('../domains/district/DistrictRepository');

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
const EditDistrictUseCase = require('../applications/use_case/EditDistrictUseCase');
const GetDistrictsUseCase = require('../applications/use_case/GetDistrictsUseCase');
const SignInUseCase = require('../applications/use_case/SignInUseCase');
const SignUpUseCase = require('../applications/use_case/SignUpUseCase');
const ViewDistrictUseCase = require('../applications/use_case/ViewDistrictUseCase');
const ViewEditDistrictUseCase = require('../applications/use_case/ViewEditDistrictUseCase');
const GetCheckIsHostPayload = require('../applications/use_case/GetCheckIsHostUseCase');

// validator
const AuthValidator = require('../applications/validator/AuthValidator');
const HostValidator = require('../applications/validator/HostValidator');
const MongooseValidator = require('../applications/validator/MongooseValidator');

// validator infrastructure
const AuthValidatorJoi = require('./validator/auth/AuthValidatorJoi');
const HostValidatorJoi = require('./validator/host/HostValidatorJoi');
const MongooseValidatorMogoose = require('./validator/mongoose/MongooseValidatorMogoose');

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
    key: MongooseValidator.name,
    Class: MongooseValidatorMogoose,
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
      ],
    },
  },
  {
    key: EditDistrictUseCase.name,
    Class: EditDistrictUseCase,
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
    key: GetCheckIsHostPayload.name,
    Class: GetCheckIsHostPayload,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'hostRepository',
          internal: HostRepository.name,
        },
        {
          name: 'hostValidator',
          internal: HostValidator.name,
        },
        {
          name: 'mongooseValidator',
          internal: MongooseValidator.name,
        },
      ],
    },
  },
  {
    key: GetDistrictsUseCase.name,
    Class: GetDistrictsUseCase,
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
          name: 'hostRepository',
          internal: HostRepository.name,
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
      ],
    },
  },
]);

module.exports = container;
