// Centralized error handler. Route handlers should call next(err)
// rather than formatting error responses themselves.
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Something went wrong" : err.message,
  });
};
