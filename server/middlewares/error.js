const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if(err.code ===11000){
    const error = Object.keys(err.keyPattern).join(", ");
    err.message = `Duplicate field  - ${error}`
    err.statusCode = 400;
  
  }

  if(err.name=== "CastError"){
    const errorPath = e.path
    err.message=`Invalid format of ${errorPath}`;
    err.statusCode= 400;
    }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const  tryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res,  next);
  } catch (error) {
    next(error);
  }
};
export { errorMiddleware, tryCatch };
