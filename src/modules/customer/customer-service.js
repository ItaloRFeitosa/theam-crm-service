const { Result } = require("#core/result");
const {
  CustomerAlreadyExistsError,
  CustomerNotExistsError,
} = require("./customer-error");

const CreateCustomer =
  ({ customerRepository }) =>
  async (createCustomerDTO) => {
    const exists = await customerRepository.existsByEmail(createCustomerDTO.email);
    if (exists) return Result.fail(CustomerAlreadyExistsError.error(createCustomerDTO.email));
    const newCustomer = await customerRepository.create(createCustomerDTO);
    return Result.ok(newCustomer);
  };

const UpdateCustomer =
  ({ customerRepository }) =>
  async (customerId, updateCustomerDTO) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotExistsError.error(customerId));
    const customerUpdated = await customerRepository.updateById(customerId, updateCustomerDTO);
    return Result.ok(customerUpdated);
  };

const DeleteCustomer =
  ({ customerRepository }) =>
  async (customerId, deletedBy) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotExistsError.error(customerId));
    await customerRepository.deleteById(customerId, deletedBy);
    return Result.ok();
  };

const RetrieveCustomer =
  ({ customerRepository }) =>
  async (customerId) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotExistsError.error(customerId));
    const customerFound = await customerRepository.findById(customerId);
    return Result.ok(customerFound);
  };

const ListCustomers =
  ({ customerRepository }) =>
  async (query) => {
    const customers = await customerRepository.find(query);
    return Result.ok(customers);
  };

const UploadCustomerPhoto =
  ({ customerRepository, photoProvider }) =>
  async (customerId, photoMetadata) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotExistsError.error(customerId));
    const photo = await photoProvider.createPhoto(customerId, photoMetadata);
    await customerRepository.updatePhoto(customerId, photo);
    return Result.ok(photo);
  };

const CustomerService = (deps) => ({
  create: CreateCustomer(deps),
  update: UpdateCustomer(deps),
  delete: DeleteCustomer(deps),
  retrieve: RetrieveCustomer(deps),
  list: ListCustomers(deps),
  uploadPhoto: UploadCustomerPhoto(deps),
});

module.exports = { CustomerService };
