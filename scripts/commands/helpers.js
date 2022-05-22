module.exports.getArgs = () => {
  const [, , ...rawArgs] = process.argv;

  const args = rawArgs.reduce((memo, rawArg) => {
    const [arg, value] = rawArg.split("=");
    return {
      ...memo,
      [arg]: value,
    };
  }, {});

  return args;
};
