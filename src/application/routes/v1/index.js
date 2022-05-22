const { Router } = require("express")
const { setupAuthRoutes } = require("./auth")
const { setupCustomerRoutes } = require("./customer")
const { setupUserRoutes } = require("./user")

const setupV1Routes = (app) => {
  const router = Router()
  setupCustomerRoutes(router)
  setupUserRoutes(router)
  setupAuthRoutes(router)
  app.use("/v1", router)
}

module.exports = { setupV1Routes }
