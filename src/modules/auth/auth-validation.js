const { schema, Validation } = require("#core/validation");
const { UserRole } = require("#modules/user/user");

const SignInValidation = Validation(
  schema.object({
    body: schema
      .object({
        email: schema.string().email().required(),
        password: schema.string().required(),
      })
      .required(),
  })
);

const SignUpValidation = Validation(
  schema.object({
    body: schema
      .object({
        email: schema.string().email().required(),
        password: schema.string().min(8).required(),
        role: schema.string().oneOf([UserRole.USER]).optional()
      })
      .required(),
  })
);

module.exports = { SignInValidation, SignUpValidation };
