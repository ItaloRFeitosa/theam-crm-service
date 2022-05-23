const { Result } = require("#core/result");
const { UserRole, User } = require("./user");
const { UserEmailAlreadyTaken, UserNotFound } = require("./user-error");

const CreateUser =
  ({ userRepository, cryptoProvider }) =>
  async (createUserDTO) => {
    const exists = await userRepository.existsByEmail(createUserDTO.email);
    if (exists) return Result.fail(UserEmailAlreadyTaken.error(createUserDTO.email));
    const hashedUser = await cryptoProvider.hashPassword(createUserDTO);
    const newUser = await userRepository.create(hashedUser);
    return Result.ok(newUser);
  };

const UpdateUser =
  ({ userRepository, cryptoProvider }) =>
  async (userId, updateUserDTO) => {
    const exists = await userRepository.existsById(userId);
    if (!exists) return Result.fail(UserNotFound.error(userId));
    const hashedUser = await cryptoProvider.hashPassword(updateUserDTO);
    const userUpdated = await userRepository.updateById(userId, hashedUser);
    return Result.ok(userUpdated);
  };

const PromoteUserToAdmin =
  ({ userRepository }) =>
  async (userId) => {
    const userFound = await userRepository.findById(userId);
    if (!userFound) return Result.fail(UserNotFound.error(userId));
    if (User.isAdmin(userFound)) return Result.ok(userFound);
    const userUpdated = await userRepository.updateById(userId, {
      role: UserRole.ADMIN,
    });
    return Result.ok(userUpdated);
  };

const DeleteUser =
  ({ userRepository }) =>
  async (userId) => {
    const exists = await userRepository.existsById(userId);
    if (!exists) return Result.fail(UserNotFound.error(userId));
    await userRepository.deleteById(userId);
    return Result.ok();
  };

const RetrieveUser =
  ({ userRepository }) =>
  async (userId) => {
    const userFound = await userRepository.findById(userId);
    if (!userFound) return Result.fail(UserNotFound.error(userId));
    return Result.ok(userFound);
  };

const ListUsers =
  ({ userRepository }) =>
  async (query) => {
    const users = await userRepository.find(query);
    return Result.ok(users);
  };

const UserService = (deps) => ({
  create: CreateUser(deps),
  update: UpdateUser(deps),
  delete: DeleteUser(deps),
  retrieve: RetrieveUser(deps),
  list: ListUsers(deps),
  promoteToAdmin: PromoteUserToAdmin(deps),
});

module.exports = { UserService };
