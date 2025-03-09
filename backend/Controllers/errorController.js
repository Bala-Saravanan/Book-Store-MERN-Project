const devErrors = (res, err) => {
  return res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const prodErrors = (res, err) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong! Please try again later!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "developement") {
    devErrors(res, err);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, err);
  }
};

export default globalErrorHandler;
