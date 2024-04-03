import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { tryCatch } from "./error.js";

const isAuthenticated = tryCatch((req, res, next) => {
  const token = req.cookies["chattu-token"];
  // console.log("cookies",req.cookies);
  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
});

export { isAuthenticated };
