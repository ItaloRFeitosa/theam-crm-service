const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

const User = {
  isAdmin: (user) => user.role === UserRole.ADMIN,
};

module.exports = { User, UserRole };
