const { UserRole } = require("./user");

const CreateUserDTO = ({ body }) => ({
  email: body.email,
  password: body.password,
  role: body.role || UserRole.USER
});

const UpdateUserDTO = ({ body }) => ({
  password: body.password,
});

const ListUsersQuery = ({ query }) => ({
  page: query.page || 1,
  limit: query.limit || 50,
  search: query.search,
  role: query.role
});

module.exports = { CreateUserDTO, UpdateUserDTO, ListUsersQuery };
