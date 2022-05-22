const { ObjectId } = require("mongoose").Types;
const schema = require("yup");
ObjectId.isValid;
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

  return Result.ok();
};

const isValidId = (idCheckers) => (value) => idCheckers.some((fn) => fn(value));

const IdSchema = schema
  .string()
  .test(
    "should be a valid id",
    "${path} must be a valid id",
    isValidId([ObjectId.isValid])
  );

module.exports = { ValidationError, schema, Validation, IdSchema };
