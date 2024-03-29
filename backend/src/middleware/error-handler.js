export default function errorHandler(err, req, res, next) {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(`,\xa0`);
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${
      Object.keys(err.keyValue)[0]
    } field, please choose another value.`;
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}
