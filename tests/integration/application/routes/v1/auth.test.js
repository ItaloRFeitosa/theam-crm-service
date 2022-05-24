const { matchers } = require("jest-json-schema");
expect.extend(matchers);
const { ValidationError } = require("#core/validation");
const { Database } = require("#tests/fixtures/database");
const {
  errorResponseJsonSchema,
} = require("#tests/schemas/routes/error-response-schema");
const { authRoutes } = require("#tests/fixtures/auth-routes");
const {
  signInResponseSchema,
} = require("#tests/schemas/routes/auth/sign-in-response-schema");
const { SignInError } = require("#modules/auth/auth-errors");
const { UserEmailAlreadyTaken } = require("#modules/user/user-error");
const {
  signUpResponseSchema,
} = require("#tests/schemas/routes/auth/sign-up-response-schema");

describe("v1 Auth Routes", () => {
  describe("POST /v1/auth/sign-in", () => {
    describe("when body has invalid params", () => {
      const invalidParams = [
        { email: "invalidemail", password: "123456" },
        { password: "missing email" },
        { email: "missing@password.com" },
        {},
      ];
      it.each(invalidParams)(
        "should return 400 with ValidationError error",
        async (params) => {
          const response = await authRoutes.signIn(params);

          expect(response.status).toBe(400);
          expect(response.body).toMatchSchema(
            errorResponseJsonSchema(ValidationError.error().name)
          );
        }
      );
    });
    describe("when user exists", () => {
      let db = Database();
      const testUser = {
        email: "test@test.com",
        password: "12345678",
        role: "user",
      };

      beforeEach(async () => {
        await db.setup();
        await db.addUser(testUser);
      });
      afterEach(async () => {
        await db.teardown();
      });
      it("should return 200 with accessToken", async () => {
        const response = await authRoutes.signIn({
          email: testUser.email,
          password: testUser.password,
        });

        expect(response.status).toBe(200);
        expect(response.body).toMatchSchema(signInResponseSchema);
      });
    });
    describe("when user not found", () => {
      let db = Database();
      const testUser = {
        email: "test@test.com",
        password: "12345678",
        role: "user",
      };

      beforeEach(async () => {
        await db.setup();
        await db.addUser(testUser);
      });
      afterEach(async () => {
        await db.teardown();
      });
      it("should return 400 with Auth.SignInError error", async () => {
        const notExist = { email: "not@exists.com", password: "12345678" };

        const response = await authRoutes.signIn({
          email: notExist.email,
          password: notExist.password,
        });

        expect(response.status).toBe(401);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(SignInError.error().name)
        );
      });
    });
    describe("password doesn't match", () => {
      let db = Database();
      const testUser = {
        email: "test@test.com",
        password: "12345678",
        role: "user",
      };

      beforeEach(async () => {
        await db.setup();
        await db.addUser(testUser);
      });
      afterEach(async () => {
        await db.teardown();
      });
      it("should return 400 with Auth.SignInError error", async () => {
        const response = await authRoutes.signIn({
          email: testUser.email,
          password: "wrong-password",
        });

        expect(response.status).toBe(401);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(SignInError.error().name)
        );
      });
    });
  });
});
describe("POST /v1/auth/sign-up", () => {
  describe("when body has invalid params", () => {
    const invalidParams = [
      { email: "invalidemail", password: "123456" },
      { password: "missing email" },
      { email: "missing@password.com" },
      {},
    ];
    it.each(invalidParams)(
      "should return 400 with ValidationError error",
      async (params) => {
        const response = await authRoutes.signUp(params);

        expect(response.status).toBe(400);
        expect(response.body).toMatchSchema(
          errorResponseJsonSchema(ValidationError.error().name)
        );
      }
    );
  });
  describe("when user already exists", () => {
    let db = Database();
    const testUser = {
      email: "test@test.com",
      password: "12345678",
      role: "user",
    };

    beforeEach(async () => {
      await db.setup();
      await db.addUser(testUser);
    });
    afterEach(async () => {
      await db.teardown();
    });
    it("should return 400 with Auth.UserEmailAlreadyTaken error", async () => {
      const response = await authRoutes.signUp({
        email: testUser.email,
        password: "somepassword",
      });

      expect(response.status).toBe(422);
      expect(response.body).toMatchSchema(
        errorResponseJsonSchema(UserEmailAlreadyTaken.error().name)
      );
    });
  });
  describe("when user not exists", () => {
    let db = Database();
    beforeEach(async () => {
      await db.setup();
    });
    afterEach(async () => {
      await db.teardown();
    });

    const validUsers = [
      { email: "user@email.com", password: "12345678" },
      { email: "user2@email.com", password: "12345678" },
    ];

    it.each(validUsers)("should return 201 with User data", async (newUser) => {
      const response = await authRoutes.signUp(newUser);
      const isRegistered = await db.existsUser(newUser.email);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({data: { email: newUser.email, role: "user"}});
      expect(response.body).toMatchSchema(signUpResponseSchema);
      expect(isRegistered).toBeTruthy();
    });
  });
});
