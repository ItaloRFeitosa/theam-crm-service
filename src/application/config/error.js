function setupErrorMiddleware(app, logger = console) {
  app.use(function (err, req, res, next) {
    logger.error(`[InternalError][${req.traceId}]:`, err)

    res.status(500).json({
      error:{
        name: "InternalServerError",
        reason: ["something went wrong", "contact support"],
      },
      traceId: req.traceId,
    });
  });
}

module.exports = {
  setupErrorMiddleware,
};
