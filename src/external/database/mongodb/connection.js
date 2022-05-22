const { STAGE, MONGO_URI } = require("#application/config/constants")
const { connect, connection, disconnect } = require("mongoose");

const databaseName = {
  development: "crm-service-dev",
  test: "crm-service-test",
}

const localhostUrl =
  `mongodb://root:mongo@localhost:27017/${databaseName[STAGE]}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

const mongoUri = MONGO_URI || localhostUrl;

connection.on("error", () => console.error("Error on connecting to mongodb"))
connection.on("connected", () => console.info("connected to mongodb"))
connection.on("disconnected", () => console.info("disconnected to mongodb"))

const isConnected = () => connection.readyState === 1;

const createConnection = (uri = mongoUri) => {
  console.log(mongoUri)
  return connect(uri);
};

module.exports = { isConnected, createConnection, disconnect };
