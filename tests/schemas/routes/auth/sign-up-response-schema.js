const signUpResponseSchema = {
  properties: {
    data: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        role: {
          type: "string",
        },
      },
      required: ["email", "id", "role"],
    },
  },
  required: ["data"],
};

module.exports = { signUpResponseSchema };
