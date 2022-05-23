const isJSONBadlyFormattedError = (err) => {
  return err.name == "SyntaxError" && err.message.includes("JSON");
};

function setupErrorMiddleware(app, logger = console) {
  app.use(function (err, req, res) {
    if (isJSONBadlyFormattedError(err)) {
      return res.status(400).json({
        error: {
          name: "BadlyFormattedJSON",
          reason: [err.message],
        },
      });
    }

    logger.error(
      JSON.stringify(
        {
          id: req.traceId,
          name: err.name,
          message: err.message,
          stack: err.stack,
        },
        null,
        2
      )
    );

    res.status(500).json({
      error: {
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
