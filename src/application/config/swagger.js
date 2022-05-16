const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../../swagger.json");
const { ENABLE_SWAGGER } = require("./constants");

const setupSwagger = (app) => {
  if(ENABLE_SWAGGER){
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
};

module.exports = { setupSwagger };
