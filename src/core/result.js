const ResultData = (isSuccess) => (data) =>
  isSuccess
    ? { isError: false, data, error: null }
    : { isError: true, data: null, error: data };

const Result = {
  ok: ResultData(true),
  fail: ResultData(false),
};

module.exports = { Result };
