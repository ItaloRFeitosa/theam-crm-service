const { CustomerController } = require("./customer-controller");
const { CustomerPhotoProvider } = require("./customer-photo-provider");
const { CustomerRepository } = require("./customer-repository");
const { CustomerService } = require("./customer-service");

const customerModule = CustomerController({
  customerService: CustomerService({
    customerRepository: CustomerRepository(),
    photoProvider: CustomerPhotoProvider(),
  })
});

module.exports = { customerModule };
