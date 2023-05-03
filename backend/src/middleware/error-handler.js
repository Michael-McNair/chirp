const errorHandler = (err, req, res, next) => {
  console.log(err);
  next();
};

export default errorHandler;
