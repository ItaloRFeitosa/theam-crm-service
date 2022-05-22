const { Response } = require("#core/http/response");
const { CreateUserDTO, ListUsersQuery, UpdateUserDTO } = require("./user-dto");

const CreateUserController =
  ({ userService }) =>
  async (request) => {
    const dto = CreateUserDTO(request);
    const result = await userService.create(dto);
    if (result.isError) return Response.unprocessedEntity(result);
    return Response.created(result);
  };

const UpdateUserController =
  ({ userService }) =>
  async (request) => {
    const { userId } = request.params;
    const dto = UpdateUserDTO(request);
    const result = await userService.update(userId, dto);
    if (result.isError) return Response.notFound(result);
    return Response.ok(result);
  };

const PromoteUserToAdminController =
  ({ userService }) =>
  async (request) => {
    const { userId } = request.params;
    const result = await userService.promoteToAdmin(userId);
    if (result.isError) return Response.notFound(result);
    return Response.ok(result);
  };

const DeleteUserController =
  ({ userService }) =>
  async (request) => {
    const { userId } = request.params;
    const result = await userService.delete(userId);
    if (result.isError) return Response.notFound(result);
    return Response.noContent();
  };

const RetrieveUserController =
  ({ userService }) =>
  async (request) => {
    const { userId } = request.params;
    const result = await userService.retrieve(userId);
    if (result.isError) return Response.notFound(result);
    return Response.ok(result);
  };

const ListCustomersController =
  ({ userService }) =>
  async (request) => {
    const query = ListUsersQuery(request);
    const result = await userService.list(query);
    return Response.ok(result);
  };

const UserController = (deps) => ({
  create: CreateUserController(deps),
  update: UpdateUserController(deps),
  delete: DeleteUserController(deps),
  retrieve: RetrieveUserController(deps),
  list: ListCustomersController(deps),
  promoteToAdmin: PromoteUserToAdminController(deps),
});

module.exports = { UserController };
