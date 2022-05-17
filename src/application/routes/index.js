const { Router } = require("express")
const { setupCustomerRoutes } = require("./v1/customer")

const setupRoutes = (app) => {
  const router = Router()

  setupCustomerRoutes(router)

  app.use("/v1", router)
  app.get("/health-check", (_, res) => res.status(200).json({message: "app is running"}) )
}

module.exports = { setupRoutes }
