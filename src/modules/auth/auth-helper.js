const { Result } = require("#core/result");
const { EnsureAuthorizationError } = require("./auth-errors");

const extractToken = (request) => {
  const authHeader = request.headers["Authorization"] || request.headers["authorization"];
  if (!authHeader) return Result.fail(EnsureAuthorizationError.error("missing authorization header"));
  const [bearer, token] = authHeader.split(" ");
  const isWrongFormat = !bearer || bearer != "Bearer" || !token;
  if (isWrongFormat) return Result.fail(EnsureAuthorizationError.error("should be format 'Bearer {{token}}'"));
  return Result.ok(token)
}

module.exports = { extractToken }
