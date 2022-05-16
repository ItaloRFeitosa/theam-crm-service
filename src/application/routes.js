const setupRoutes = (app) => {
  app.get("/health-check", (_, res) => res.status(200).json({message: "app is running"}) )
}

module.exports = { setupRoutes }
