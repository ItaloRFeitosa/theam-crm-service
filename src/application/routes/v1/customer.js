const { listCustomersHateoas, customerHateoas } = require("#application/hateoas/v1/customer");
const { authMiddleware } = require("#modules/auth/auth-module");
const { customerModule } = require("#modules/customer/customer-module");
const { CreateCustomerValidation, UpdateCustomerValidation, ListCustomersValidation, CustomerIdValidation, UploadCustomerPhotoValidation } = require("#modules/customer/customer-validation");
const { Router } = require("express");
const { adaptController, adaptValidation, adaptMiddleware } = require("../../config/express-adapter");

function setupCustomerRoutes(app) {
  const router = Router();
  router.use(adaptMiddleware(authMiddleware.ensureAuthorization))
  router.post("/", adaptValidation(CreateCustomerValidation), adaptController(customerModule.create, customerHateoas));
  router.get("/", adaptValidation(ListCustomersValidation), adaptController(customerModule.list, listCustomersHateoas));
  router.get("/:customerId", adaptValidation(CustomerIdValidation), adaptController(customerModule.retrieve, customerHateoas));
  router.put("/:customerId", adaptValidation(UpdateCustomerValidation), adaptController(customerModule.update, customerHateoas));
  router.delete("/:customerId", adaptValidation(CustomerIdValidation), adaptController(customerModule.delete));
  router.patch("/:customerId/photo", adaptValidation(UploadCustomerPhotoValidation), adaptController(customerModule.uploadPhoto));
  app.use("/customers", router);
}

module.exports = { setupCustomerRoutes };
