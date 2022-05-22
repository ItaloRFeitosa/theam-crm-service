const { Request } = require("#core/http/request");

const adaptRequest = (req) =>
  Request({
    traceId: req.traceId,
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    user: req.user,
    path: req.baseUrl
  });

const adaptController = (controllerMethod, hateoas = (_, res) => res) => async (req, res, next) => {
  try {
    const request = adaptRequest(req);
    const response = await controllerMethod(request);
    const hateoasResponse = hateoas(request, response)
    return res.status(hateoasResponse.statusCode).json(hateoasResponse.body);
  } catch (error) {
    next(error);
  }
};

const adaptValidation = (validation) => async (req, res, next) => {
  try {
    const request = adaptRequest(req);
    const result = await validation(request);
    if (result.isError) return res.status(400).json({ error: result.error });
    return next();
  } catch (error) {
    next(error);
  }
};

const adaptMiddleware = (middlewareMethod) => async (req, res, next) => {
  try {
    const request = adaptRequest(req);
    const middlewareResponse = await middlewareMethod(request);
    if (!middlewareResponse.next) {
      return res.status(middlewareResponse.statusCode).json(middlewareResponse.body);
    }
    // merge response data with express request
    Object.assign(req, middlewareResponse.body);
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adaptController, adaptValidation, adaptMiddleware };
