const { schema, Validation, IdSchema } = require("#core/validation");
const { UserRole } = require("./user");
const userPasswordSchema = schema.string().min(8).required();

const CreateUserValidation = Validation(
  schema.object({
    body: schema
      .object({
        email: schema.string().email().required(),
        password: userPasswordSchema,
        role: schema.string().oneOf(Object.values(UserRole)),
      })
      .required(),
  })
);

const UpdateUserValidation = Validation(
  schema.object({
    body: schema
      .object({
        password: userPasswordSchema,
      })
      .required(),
    params: schema
      .object({
        userId: IdSchema.required(),
      })
      .required(),
  })
);

const ListUsersValidation = Validation(
  schema.object({
    query: schema
      .object({
        page: schema.number().integer().min(1),
        limit: schema.number().integer().min(1).max(100),
        search: schema.string(),
        role: schema.string().oneOf(Object.values(UserRole)),
      })
      .optional(),
  })
);

const UserIdValidation = Validation(
  schema.object({
    params: schema
      .object({
        userId: IdSchema.required(),
      })
      .required(),
  })
);

module.exports = {
  CreateUserValidation,
  UpdateUserValidation,
  ListUsersValidation,
  UserIdValidation,
};
