const responseHandler = {
  success: (res, statusCode = 200, message = "Success") => {
    return res.status(statusCode).json({
      success: true,
      message,
    });
  },

  error: (res, statusCode = 500, message = "Internal Server Error") => {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  },
};

module.exports = { responseHandler };