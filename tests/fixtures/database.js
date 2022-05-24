const {
  createConnection,
  disconnect,
} = require("#external/database/mongodb/connection");
const { UserModel } = require("#external/database/mongodb/models/user");
const { hash } = require("#external/security/bcrypt");

const Database = () => {
  let dropDatabase
  return {
    setup: async () => {
      const conn = await createConnection()
      dropDatabase = () => conn.connection.dropDatabase()
    },
    addUser: async ({ email, password, role }) => {
      const userDoc = await UserModel.create({
        email,
        role,
        password: await hash(password),
      });

      return userDoc.toObject();
    },
    existsUser: (email) => UserModel.exists({ email }),
    teardown: async () => {
      await dropDatabase()
      await disconnect();
    },
  };
};

module.exports = { Database };
