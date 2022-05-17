const CreateCustomerDTO = ({ user, body }) => ({
  createdBy: user.id,
  updatedBy: user.id,
  name: body.name,
  surname: body.surname,
  email: body.email,
});

const UpdateCustomerDTO = ({ user, body }) => ({
  updatedBy: user.id,
  name: body.name,
  surname: body.surname,
});

const DeleteCustomerDTO = ({ user, params }) => ({
  deletedBy: user.id,
  customerId: params.customerId,
});

const ListCustomersQuery = ({ query }) => ({
  page: query.page || 1,
  limit: query.limit || 50,
  search: query.search,
});

module.exports = { CreateCustomerDTO, UpdateCustomerDTO, DeleteCustomerDTO, ListCustomersQuery };
