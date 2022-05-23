const { errorOf } = require("#core/error");

const CustomerAlreadyExistsError = errorOf(
  "Customer.AlreadyExistsError",
  (email) => `customer with email: ${email} already exists`
);

const CustomerNotFound = errorOf(
  "Customer.NotFound",
  (customerId) => `customer with id: ${customerId} not found`
);

module.exports = {
  CustomerAlreadyExistsError,
  CustomerNotFound,
};
