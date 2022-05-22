const { UserCryptoProvider } = require("#modules/user/user-crypto-provider");
const { UserRepository } = require("#modules/user/user-repository");
const { AuthController } = require("./auth-controller");
const { AuthJwtProvider } = require("./auth-jwt-provider");
const { AuthMiddleware } = require("./auth-middleware");
const { AuthService } = require("./auth-service");

const jwtProvider = AuthJwtProvider();

const authModule = AuthController({
  authService: AuthService({
    userRepository: UserRepository(),
    cryptoProvider: UserCryptoProvider(),
    jwtProvider,
  }),
});

const authMiddleware = AuthMiddleware({ jwtProvider });

module.exports = { authModule, authMiddleware };
