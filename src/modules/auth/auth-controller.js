const { Response } = require("#core/http/response");
const { SignInDTO } = require("./auth-dto");

const SignInController =
  ({ authService }) =>
  async (request) => {
    const dto = SignInDTO(request);
    const result = await authService.signIn(dto);
    if (result.isError) return Response.unauthorized(result);
    return Response.ok(result);
  };

const AuthController = (deps) => ({
  signIn: SignInController(deps),
});

module.exports = { AuthController };
