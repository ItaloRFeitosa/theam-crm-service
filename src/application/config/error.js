const isJSONBadlyFormattedError = (err) => {
  return err.name == "SyntaxError" && err.message.includes("JSON")
}


function setupErrorMiddleware(app, logger = console) {
  app.use(function (err, req, res, next) {
    if(isJSONBadlyFormattedError(err)){
      return res.status(400).json({
        error:{
          name: "BadlyFormattedJSON",
          reason: [err.message],
        },
      });
    }

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
