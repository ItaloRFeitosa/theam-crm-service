const { errorOf } = require("#core/error");

const UserEmailAlreadyTaken = errorOf(
  "User.EmailAlreadyTaken",
  (email) => `email: ${email} already taken`
);

const UserNotFound = errorOf(
  "User.NotFound",
  (UserId) => `user with id: ${UserId} not found`
);

module.exports = {
  UserEmailAlreadyTaken,
  UserNotFound,
};
