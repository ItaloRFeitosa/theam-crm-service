const { isError } = require("#core/error");
const { Result } = require("#core/result");
const { sign, verifyAndDecode } = require("#external/security/jwt/index");
const { EnsureAuthorizationError } = require("./auth-errors");

const AuthJwtProvider = () => ({
  signUser: (user) => {
    const { id, role } = user
    return sign({ user: { id, role }})
  },
  verifyAndDecodeUser: async (jwt) => {
    const decodedOrError = await verifyAndDecode(jwt).catch(err => err)
    if(isError(decodedOrError)) return Result.fail(EnsureAuthorizationError.error("invalid token"))
    const { user } = decodedOrError
    const hasUserInfo = !!user.id && !!user.role;
    if (!hasUserInfo) return Result.fail(EnsureAuthorizationError.error("invalid token"))
    return Result.ok(user)
  },
});

module.exports = { AuthJwtProvider };
