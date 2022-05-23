const { documentsToObject } = require("#external/database/mongodb/helpers");
const { UserModel } = require("#external/database/mongodb/models/user");

const omitUserData = (user) => {
  const { deleted, password, ...rest } = user;
  return rest;
};

const create = async (userData) => {
  const newUserDoc = await UserModel.create(userData);
  const newUser = newUserDoc.toObject();
  return omitUserData(newUser);
};

const existsByEmail = async (email) => {
  return await UserModel.exists({ email, deleted: false });
};

const existsById = async (id) => {
  return await UserModel.exists({ _id: id, deleted: false });
};

const findById = async (id) => {
  const userFound = await UserModel.findOne(
    { _id: id, deleted: false },
    { deleted: 0, password: 0 }
  );
  if (!userFound) return null;
  return userFound.toObject();
};

const findByEmail = async (email) => {
  const userFound = await UserModel.findOne(
    { email: email, deleted: false },
    { deleted: 0 }
  );
  if (!userFound) return null;
  return userFound.toObject();
};

const find = async ({ page, limit, search, role }) => {
  const withSearch = search && { email: { $regex: search, $options: "i" } };
  const withRole = role && { role };
  const skip = (page - 1) * limit;
  const users = await UserModel.find(
    { deleted: false, ...withSearch, ...withRole },
    { deleted: 0, password: 0 },
    { skip, limit }
  );
  if (!users) return [];
  return documentsToObject(users);
};

const updateById = async (id, userData) => {
  const userUpdated = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
  });
  if (!userUpdated) return null;
  return omitUserData(userUpdated.toObject());
};

const deleteById = async (id) => {
  await UserModel.findByIdAndUpdate(id, { deleted: true });
};

const UserRepository = () => ({
  create,
  existsByEmail,
  existsById,
  findById,
  findByEmail,
  find,
  updateById,
  deleteById,
});

module.exports = { UserRepository };
