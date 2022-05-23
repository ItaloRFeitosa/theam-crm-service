const { userModule } = require("#modules/user/user-module");
const { authModule } = require("#modules/auth/auth-module");
const { Router } = require("express");
const { adaptController, adaptValidation } = require("../../config/express-adapter");
const { SignUpValidation, SignInValidation } = require("#modules/auth/auth-validation");

function setupAuthRoutes(app) {
  const router = Router();
  router.post("/sign-up", adaptValidation(SignUpValidation), adaptController(userModule.create));
  router.post("/sign-in",  adaptValidation(SignInValidation), adaptController(authModule.signIn));
  app.use("/auth", router);
}

module.exports = { setupAuthRoutes };
