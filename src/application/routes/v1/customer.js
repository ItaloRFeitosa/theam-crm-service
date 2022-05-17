const { customerModule } = require("#modules/customer/customer-module");
const { CreateCustomerValidation, UpdateCustomerValidation } = require("#modules/customer/customer-validation");
const { Router } = require("express");
const { adaptController, adaptValidation } = require("../../config/express-adapter");

function setupCustomerRoutes(app) {
  const router = Router();

  router.post("/", adaptValidation(CreateCustomerValidation),adaptController(customerModule.create));
  router.get("/", adaptController(customerModule.list));
  router.get("/:customerId", adaptController(customerModule.retrieve));
  router.put("/:customerId", adaptValidation(UpdateCustomerValidation), adaptController(customerModule.update));
  router.delete("/:customerId", adaptController(customerModule.delete));
  router.patch("/:customerId/photo", adaptController(customerModule.uploadPhoto));

  app.use("/customers", router);
}

module.exports = { setupCustomerRoutes };
