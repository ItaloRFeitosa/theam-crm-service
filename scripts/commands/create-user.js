const { Request } = require("#core/http/request");
const { userModule } = require("#modules/user/user-module");
const { createConnection } = require("#external/database/mongodb/connection");
const { getArgs } = require("./helpers");

const commandToRequest = () => {
  const args = getArgs();
  return Request({
    body: { email: args.email, password: args.password, role: args.role },
  });
};

const CreateAdminCommandHandler = async () => {
  const request = commandToRequest();
  const response = await userModule.create(request);

  console.info("Create User Response: ", JSON.stringify(response, null, 2));
  process.exit(0)
};

createConnection().then(() => CreateAdminCommandHandler()).catch(err => {
  console.error(err)
  process.exit(1)
});
