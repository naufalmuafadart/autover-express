// // eslint-disable-next-line max-classes-per-file
// const ReadCheckIsHostUseCase = require('../ReadCheckIsHostUseCase');
//
// const payload = { id: '63db4a1ce571346564fc2ee0' };
//
// const hostRepository = {
//   checkIsUserAHost: async (id) => true,
// };
//
// const mongooseValidator = {
//   validateId: () => {},
// };
//
// const authenticationTokenManager = {
//   getTokenFromAuthorizationHeader: () => '63db4a1ce571346564fc2ee0',
//   verifyAccessToken: (token) => payload,
// };
//
// describe('A ReadCheckIsHost UseCase', () => {
//   it('should not throw error when input valid', async () => {
//     const readCheckIsHostUseCase = new ReadCheckIsHostUseCase({
//       hostRepository,
//       mongooseValidator,
//       authenticationTokenManager,
//     });
//     const token = 'token';
//     const headerValue = `Bearer ${token}`;
//     expect(() => readCheckIsHostUseCase.execute(headerValue)).not.toThrowError();
//   });
//
//   it('should orchestrating ReadCheckIsHost well', async () => {
//     const readCheckIsHostUseCase = new ReadCheckIsHostUseCase({
//       hostRepository,
//       mongooseValidator,
//       authenticationTokenManager,
//     });
//     const token = 'token';
//     const headerValue = `Bearer ${token}`;
//     expect(() => readCheckIsHostUseCase.execute(headerValue)).not.toThrowError();
//   });
// });
