const { hash, compare } = require("#external/security/bcrypt");

const UserCryptoProvider = () => ({
  hashPassword: async (user) => {
    return { ...user, password: await hash(user.password) };
  },

  checkPassword: (user, password) => {
    return compare(password, user.password);
  },
});

module.exports = { UserCryptoProvider };
