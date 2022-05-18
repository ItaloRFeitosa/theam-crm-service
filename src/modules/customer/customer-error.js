const { errorOf } = require("#core/error");

const CustomerAlreadyExistsError = errorOf(
  "Customer.AlreadyExistsError",
  (email) => `customer with email: ${email} already exists`
);

const CustomerNotExistsError = errorOf(
  "Customer.NotExistsError",
  (customerId) => `customer with id: ${customerId} not exists`
);

module.exports = {
  CustomerAlreadyExistsError,
  CustomerNotExistsError,
};
