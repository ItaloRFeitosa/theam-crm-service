const ResponseData = (props) => ({
  statusCode: props.statusCode || null,
  body: props.body || null,
  next: props.next || false,
});

const HttpError =
  (statusCode, defaultMessage) =>
  ({ error }) => {
    error.reason = error.reason || [error.message] || [defaultMessage];

    return ResponseData({
      statusCode,
      body: {
        error: {
          name: error.name,
          reason: error.reason,
        },
      },
    });
  };

const HttpSuccess =
  (statusCode) =>
  (resultLike = { data: {} }) =>
    ResponseData({
      statusCode,
      body: { data: resultLike.data },
    });

const Response = {
  ok: HttpSuccess(200),
  created: HttpSuccess(201),
  noContent: HttpSuccess(204),
  badRequest: HttpError(400, "BadRequest"),
  unprocessedEntity: HttpError(422, "UnprocessedEntity"),
  unauthorized: HttpError(401, "Unauthorized"),
  forbidden: HttpError(403, "Forbidden"),
  notFound: HttpError(404, "NotFound"),
};

const MiddlewareResponse = {
  ...Response,
  next: (body = {}) => ResponseData({ next: true, body }),
};

module.exports = { Response, MiddlewareResponse, ResponseData };
