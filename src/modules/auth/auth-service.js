const { Result } = require("#core/result");
const { SignInError } = require("./auth-errors");

const SignIn =
  ({ userRepository, jwtProvider, cryptoProvider }) =>
  async ({ email, password }) => {
    const userFound = await userRepository.findByEmail(email);
    if (!userFound) return Result.fail(SignInError.error());
    const isPasswordMatched = await cryptoProvider.checkPassword(userFound, password);
    if (!isPasswordMatched) return Result.fail(SignInError.error());
    const token = await jwtProvider.signUser(userFound);
    return Result.ok(token)
  };

const AuthService = (deps) => ({
  signIn: SignIn(deps),
});

module.exports = { AuthService };
