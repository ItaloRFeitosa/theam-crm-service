const signInResponseSchema = {
  properties: {
    data: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
        },
        type: {
          type: "string",
          const: "Bearer",
        },
        expiresAt: {
          type: "string",
          format: "date-time",
        },
        issuedAt: {
          type: "string",
          format: "date-time",
        },
      },
      required: ["accessToken", "type", "expiresAt", "issuedAt"],
    },
  },
  required: ["data"],
};

module.exports = { signInResponseSchema };
