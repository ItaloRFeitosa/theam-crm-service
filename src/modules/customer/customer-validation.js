const { schema, Validation } = require("#core/validation");

const nameSchema = () => schema.string().required().min(2)

const CreateCustomerValidation = Validation(
  schema.object({
    user: schema
      .object({
        id: schema.string().required(),
      })
      .required(),
    body: schema
      .object({
        name: nameSchema(),
        surname: nameSchema(),
        email: schema.string().email().required(),
      })
      .required(),
  })
);

const UpdateCustomerValidation = Validation(
  schema.object({
    user: schema
      .object({
        id: schema.string().required(),
      })
      .required(),
    body: schema
      .object({
        name:  nameSchema(),
        surname:  nameSchema(),
      })
      .required(),
    params: schema
      .object({
        customerId: schema.string().required(),
      })
      .required(),
  })
);

module.exports = { CreateCustomerValidation, UpdateCustomerValidation };
