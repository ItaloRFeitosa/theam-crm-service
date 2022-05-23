const { UserController } = require("./user-controller");
const { UserCryptoProvider } = require("./user-crypto-provider");
const { UserRepository } = require("./user-repository");
const { UserService } = require("./user-service");

const userModule = UserController({
  userService: UserService({
    userRepository: UserRepository(),
    cryptoProvider: UserCryptoProvider(),
  }),
});

module.exports = { userModule };
