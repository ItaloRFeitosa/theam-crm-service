const HttpError = (statusCode, defaultMessage) => ({error}) => {
  error.reason = error.reason || error.message || defaultMessage;

  return {
    statusCode,
    data: {
      error: {
        name: error.name,
        reason: error.reason,
      }
    },
  };
};

const HttpSuccess = (statusCode) => (resultLike) => ({
  statusCode,
  data: resultLike?.data,
});

const ok = HttpSuccess(200);
const created = HttpSuccess(201);
const noContent = HttpSuccess(204);
const badRequest = HttpError(400, "BadRequest");
const unprocessedEntity = HttpError(422, "UnprocessedEntity");
const unauthorized = HttpError(401, "Unauthorized");
const forbidden = HttpError(403, "Forbidden");
const notFound = HttpError(404, "NotFound");

const Response = { ok, created, noContent, badRequest, unprocessedEntity, unauthorized, forbidden, notFound };

module.exports = { Response }
