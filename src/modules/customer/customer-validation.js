const { schema, Validation, IdSchema } = require("#core/validation");

const nameSchema = () => schema.string().required().min(2);

const CreateCustomerValidation = Validation(
  schema.object({
    user: schema
      .object({
        id: IdSchema.required(),
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
        id: IdSchema.required(),
      })
      .required(),
    body: schema
      .object({
        name: nameSchema(),
        surname: nameSchema(),
      })
      .required(),
    params: schema
      .object({
        customerId: IdSchema.required(),
      })
      .required(),
  })
);

const ListCustomersValidation = Validation(
  schema.object({
    query: schema
      .object({
        page: schema.number().integer().min(1),
        limit: schema.number().integer().min(1).max(100),
        search: schema.string(),
      })
      .optional(),
  })
);

const CustomerIdValidation = Validation(
  schema.object({
    params: schema
      .object({
        customerId: IdSchema.required(),
      })
      .required(),
  })
);

const UploadCustomerPhotoValidation = Validation(
  schema.object({
    user: schema
      .object({
        id: IdSchema.required(),
      })
      .required(),
    body: schema
      .object({
        extension: schema.string().oneOf(["jpg", "png", "jpeg", "bpm", "webp"]),
      })
      .required(),
    params: schema
      .object({
        customerId: IdSchema.required(),
      })
      .required(),
  })
);

module.exports = {
  CreateCustomerValidation,
  UpdateCustomerValidation,
  ListCustomersValidation,
  CustomerIdValidation,
  UploadCustomerPhotoValidation
};
