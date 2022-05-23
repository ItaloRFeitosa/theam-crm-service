const { userHateoas, listUsersHateoas } = require("#application/hateoas/v1/user");
const { authMiddleware } = require("#modules/auth/auth-module");
const { userModule } = require("#modules/user/user-module");
const { CreateUserValidation, UpdateUserValidation, ListUsersValidation, UserIdValidation } = require("#modules/user/user-validation");
const { Router } = require("express");
const { adaptController, adaptValidation, adaptMiddleware } = require("../../config/express-adapter");

function setupUserRoutes(app) {
  const router = Router();
  router.use(adaptMiddleware(authMiddleware.ensureAuthorization))
  router.use(adaptMiddleware(authMiddleware.ensureOnlyAdminAccess))
  router.post("/", adaptValidation(CreateUserValidation),adaptController(userModule.create, userHateoas));
  router.get("/", adaptValidation(ListUsersValidation), adaptController(userModule.list, listUsersHateoas));
  router.get("/:userId", adaptValidation(UserIdValidation), adaptController(userModule.retrieve, userHateoas));
  router.put("/:userId", adaptValidation(UpdateUserValidation), adaptController(userModule.update, userHateoas));
  router.patch("/:userId/promote", adaptValidation(UserIdValidation), adaptController(userModule.promoteToAdmin, userHateoas));
  router.delete("/:userId", adaptValidation(UserIdValidation), adaptController(userModule.delete));
  app.use("/users", router);
}

module.exports = { setupUserRoutes };
