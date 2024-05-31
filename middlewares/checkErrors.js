module.exports = (err, req, res, next) => {
  const statusCode = 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message,
    statusCode: statusCode,
    stack: err.stack,
  });
};
