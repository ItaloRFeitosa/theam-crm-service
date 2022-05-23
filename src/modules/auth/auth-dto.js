const SignInDTO = ({ body }) => ({
  email: body.email,
  password: body.password,
});


module.exports = { SignInDTO };
