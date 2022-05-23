const { Response } = require("#core/http/response");
const { CreateCustomerDTO, UpdateCustomerDTO, ListCustomersQuery, DeleteCustomerDTO } = require("./customer-dto");

const CreateCustomerController =
  ({ customerService }) =>
  async (request) => {
    const dto = CreateCustomerDTO(request);
    const result = await customerService.create(dto);
    if (result.isError) {
      return Response.unprocessedEntity(result);
    }
    return Response.created(result);
  };

const UpdateCustomerController =
  ({ customerService }) =>
  async (request) => {
    const { customerId } = request.params;
    const dto = UpdateCustomerDTO(request);
    const result = await customerService.update(customerId, dto);
    if (result.isError) {
      return Response.notFound(result);
    }
    return Response.ok(result);
  };

const DeleteCustomerController =
  ({ customerService }) =>
  async (request) => {
    const { customerId, deletedBy } = DeleteCustomerDTO(request);
    const result = await customerService.delete(customerId, deletedBy);
    if (result.isError) {
      return Response.notFound(result);
    }
    return Response.noContent();
  };

const RetrieveCustomerController =
  ({ customerService }) =>
  async (request) => {
    const { customerId } = request.params;
    const result = await customerService.retrieve(customerId);
    if (result.isError) {
      return Response.notFound(result);
    }
    return Response.ok(result);
  };

const ListCustomersController =
  ({ customerService }) =>
  async (request) => {
    const query = ListCustomersQuery(request);
    const result = await customerService.list(query);
    return Response.ok(result)
  };

const UploadCustomerPhotoController =
  ({ customerService }) =>
  async (request) => {
    const { customerId } = request.params;
    const result = await customerService.uploadPhoto(customerId, request.body);
    if (result.isError) {
      return Response.notFound(result);
    }
    return Response.ok(result);
  };

const CustomerController = (deps) => ({
  create: CreateCustomerController(deps),
  update: UpdateCustomerController(deps),
  delete: DeleteCustomerController(deps),
  retrieve: RetrieveCustomerController(deps),
  list: ListCustomersController(deps),
  uploadPhoto: UploadCustomerPhotoController(deps),
});

module.exports = { CustomerController };
