const { MiddlewareResponse } = require("#core/http/response");
const { Result } = require("#core/result");
const { User } = require("#modules/user/user");
const { OnlyAdminError } = require("./auth-errors");
const { extractToken } = require("./auth-helper");

const EnsureAuthorizationMiddleware =
  ({ jwtProvider }) =>
  async (request) => {
    const token = extractToken(request)
    if(token.isError) return MiddlewareResponse.unauthorized(token)
    const decoded = await jwtProvider.verifyAndDecodeUser(token.data);
    if (decoded.isError) return MiddlewareResponse.unauthorized(decoded);
    return MiddlewareResponse.next({user: decoded.data})
  };

const EnsureOnlyAdminAccessMiddleware = () => async (request) => {
  if(!User.isAdmin(request.user)){
    const failed = Result.fail(OnlyAdminError.error("restricted to admin users"))
    return MiddlewareResponse.forbidden(failed)
  }
  return MiddlewareResponse.next()
};

const AuthMiddleware = (deps) => ({
  ensureAuthorization: EnsureAuthorizationMiddleware(deps),
  ensureOnlyAdminAccess: EnsureOnlyAdminAccessMiddleware(),
});

module.exports = { AuthMiddleware };
