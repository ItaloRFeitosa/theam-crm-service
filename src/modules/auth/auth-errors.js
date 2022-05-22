const { errorOf } = require("#core/error");

const SignInError = errorOf(
  "Auth.SignInError",
  () => "wrong email or password"
);

const EnsureAuthorizationError = errorOf("Auth.EnsureAuthorizationError");

const OnlyAdminError = errorOf("Auth.OnlyAdminError");

module.exports = { SignInError, EnsureAuthorizationError, OnlyAdminError };
