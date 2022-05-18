const schema = require("yup");

const { errorOf, isError } = require("./error");
const { Result } = require("./result");

const ValidationError = errorOf("ValidationError");

const Validation = (validator) => async (input) => {
  const maybeError = await validator
    .validate(input, { abortEarly: false })
    .catch((err) => err);

  if (isError(maybeError)) {
    return Result.fail(ValidationError.error(maybeError.errors));
  }

  return Result.ok()
};

module.exports = { ValidationError, schema, Validation };
