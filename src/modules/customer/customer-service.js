const { Result } = require("#core/result");
const {
  CustomerAlreadyExistsError,
  CustomerNotFound,
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
  ({ customerRepository, photoProvider }) =>
  async (customerId, updateCustomerDTO) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotFound.error(customerId));
    const customerUpdated = await customerRepository.updateById(customerId, updateCustomerDTO);
    const customerWithSignedPhoto = await photoProvider.signPhoto(customerUpdated)
    return Result.ok(customerWithSignedPhoto);
  };

const DeleteCustomer =
  ({ customerRepository }) =>
  async (customerId, deletedBy) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotFound.error(customerId));
    await customerRepository.deleteById(customerId, deletedBy);
    return Result.ok();
  };

const RetrieveCustomer =
  ({ customerRepository, photoProvider }) =>
  async (customerId) => {
    const customerFound = await customerRepository.findById(customerId);
    if (!customerFound) return Result.fail(CustomerNotFound.error(customerId));
    const customerWithSignedPhoto = await photoProvider.signPhoto(customerFound)
    return Result.ok(customerWithSignedPhoto);
  };

const ListCustomers =
  ({ customerRepository, photoProvider }) =>
  async (query) => {
    const customers = await customerRepository.find(query);
    const customersWithSignedPhoto = await Promise.all(customers.map(photoProvider.signPhoto))
    return Result.ok(customersWithSignedPhoto);
  };

const UploadCustomerPhoto =
  ({ customerRepository, photoProvider }) =>
  async (customerId, { extension }) => {
    const exists = await customerRepository.existsById(customerId);
    if (!exists) return Result.fail(CustomerNotFound.error(customerId));
    const photo = await photoProvider.putPhoto({customerId, extension});
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
