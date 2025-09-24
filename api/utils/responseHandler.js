// Success response
exports.success = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

// Error response
exports.error = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    message
  });
};