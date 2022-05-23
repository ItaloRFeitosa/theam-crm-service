const { documentsToObject } = require("#external/database/mongodb/helpers");
const { CustomerModel } = require("#external/database/mongodb/models/customer");

const omitCustomerData = ({ deleted, ...rest }) => rest;

const create = async (customerData) => {
  const newCustomer = await CustomerModel.create(customerData);
  return omitCustomerData(newCustomer.toObject());
};

const existsByEmail = async (email) => {
  return await CustomerModel.exists({ email, deleted: false });
};

const existsById = async (id) => {
  return await CustomerModel.exists({ _id: id, deleted: false });
};

const findById = async (id) => {
  const customerFound = await CustomerModel.findOne(
    { _id: id, deleted: false },
    { deleted: 0 }
  );
  if (!customerFound) return null;
  return customerFound.toObject();
};

const withSearchQuery = (search) =>
  search && {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { surname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

const find = async ({page, limit, search}) => {
  const skip = (page - 1) * limit
  const customers = await CustomerModel.find(
    { deleted: false, ...withSearchQuery(search) },
    { deleted: 0 },
    { skip, limit }
  );
  return documentsToObject(customers);
};

const updateById = async (id, customerData) => {
  const customerUpdated = await CustomerModel.findByIdAndUpdate(
    id,
    customerData,
    { new: true }
  );
  if (!customerUpdated) return null;
  return customerUpdated.toObject();
};

const deleteById = async (id, deletedBy) => {
  await CustomerModel.findByIdAndUpdate(id, {
    deleted: true,
    updatedBy: deletedBy,
  });
};

const updatePhoto = async (id, { provider, key, bucket }) => {
  await CustomerModel.findByIdAndUpdate(id, {
    photo: { provider, key, bucket },
  });
};

const CustomerRepository = () => ({
  create,
  existsByEmail,
  existsById,
  findById,
  find,
  updateById,
  deleteById,
  updatePhoto,
});

module.exports = { CustomerRepository };
