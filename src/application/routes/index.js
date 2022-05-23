const { setupV1Routes } = require("./v1")

const setupRoutes = (app) => {
  setupV1Routes(app)
  app.get("/health-check", (_, res) => res.status(200).json({message: "app is running"}) )
}

module.exports = { setupRoutes }
