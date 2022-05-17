const { Request } = require("#core/http/request");

const adaptRequest = (req) => Request({
  traceId: req.traceId,
  body: req.body,
  headers: req.headers,
  query: req.query,
  params: req.params,
  // user: req.user,
  user: {
    id: "fake-id"
  },
})

const adaptController = (controllerMethod) => async (req, res, next) => {
  try {
    const request = adaptRequest(req)

    const response = await controllerMethod(request);

    return res.status(response.statusCode).json(response.data);
  } catch (error) {
    next(error);
  }
};

const adaptValidation = (validation) => async (req, res, next) => {
  try {
    const request = adaptRequest(req)

    const result = await validation(request);

    if(result.isError){
      return res.status(400).json(result.error)
    }

    return next()
  } catch (error) {
    next(error);
  }
};

module.exports = { adaptController, adaptValidation };
